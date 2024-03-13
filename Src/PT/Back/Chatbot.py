from langchain.memory import ChatMessageHistory
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains.combine_documents import create_stuff_documents_chain

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables import RunnableBranch
from langchain_core.output_parsers import StrOutputParser

from langchain_community.chat_models import ChatOllama
from langchain_community.document_loaders import WebBaseLoader

from typing import Dict

import time

def parse_retriever_input(params: Dict):
    return params["messages"][-1].content

start_time_embed = time.time()

url = 'https://blog.google/intl/ko-kr/company-news/technology/policy-agenda-responsible-ai-progress-opportunity-responsibility-security-kr/'
loader = WebBaseLoader(url)
data = loader.load()

text_splitter = CharacterTextSplitter(
    chunk_size=1000, 
    chunk_overlap=0, 
    separator="\n"
    )
documents = text_splitter.split_documents(data)

embed_model = HuggingFaceEmbeddings(model_name="intfloat/multilingual-e5-large")

vectorstore = Chroma.from_documents(
    documents=documents,
    embedding=embed_model,
    )

retriever = vectorstore.as_retriever(k=4)

llm = ChatOllama(model="gemma:2b", temperature=0.6 , num_gpu = 0 ) 

qa_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Answer in one sentence. Answer the user's questions based on the below context:\n\n{context}",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

query_tr_prompt = ChatPromptTemplate.from_messages(
    [
        MessagesPlaceholder(variable_name="messages"),
        (
            "user",
            "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation. Only respond with the query, nothing else.",
        ),
    ]
)

query_tr_retry_chain = RunnableBranch(
    (
        lambda x: len(x.get("messages", [])) == 1,
        # If only one message, then we just pass that message's content to retriever
        (lambda x: x["messages"][-1].content) | retriever,
    ),
    # If messages, then we pass inputs to LLM chain to transform the query, then pass to retriever
    query_tr_prompt | llm | StrOutputParser() | retriever,
).with_config(run_name="chat_retriever_chain")

document_chain = create_stuff_documents_chain(llm, qa_prompt)

conversational_chain = RunnablePassthrough.assign(
    context=query_tr_retry_chain,
).assign(
    answer=document_chain,
)

end_time_embed = time.time()
print ("--- create chain done ---")

chat_history = ChatMessageHistory()

chat_history.add_ai_message("AI rule")
chat_history.add_user_message("tell me more about that!")

start_time_chat = time.time()

response = conversational_chain.invoke(
    {
        "messages": chat_history.messages,
    }
)

end_time_chat = time.time()

chat_history.add_ai_message(response)
print ( response["answer"] )

print(f"Chain 생성 시간 : {end_time_embed - start_time_embed:.2f}초")
print(f"Chat 응답 시간 : {end_time_chat - start_time_chat:.2f}초")
