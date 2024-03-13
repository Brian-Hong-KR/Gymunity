from langchain.memory import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables.history import RunnableWithMessageHistory

import time

    
llm = ChatOllama(model="gemma:2b") 

system_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Answer in one sentence.",
        ),MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ]
)

chain = system_prompt | llm

chat_history = ChatMessageHistory()

#chat_history.clear()

history_chain = RunnableWithMessageHistory(
    chain,
    lambda session_id: chat_history,
    input_messages_key="input",
    history_messages_key="chat_history",
)

start_time = time.time()

response = history_chain.invoke(
    {"input": "tell me about you"},
    {"configurable": {"session_id": "unused"}},
)


end_time = time.time()

print ( response )
print(f"응답 시간 : {end_time - start_time:.1f}초")

print ( chat_history.messages )

# GEMMA 2B 성능
# 노트북 : 6.2 / 
# GPU 서버 : 
