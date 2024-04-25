import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const items = [
  { id: 0, title: "카테고리를 선택하세요." },
  { id: 1, title: "체중 감량" },
  { id: 2, title: "근력 향상" },
  { id: 3, title: "종합 건강 증진" },
];

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  left: 0; /* 왼쪽 정렬을 위해 추가 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 5;
`;

const ItemButton = styled.button`
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ArrowIcon = styled.div`
  margin-left: auto;
`;

const FilteringByCategory = ({ selectedItem, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(false); // 초기 상태를 false로 설정

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onSelectItem(item); // 부모 컴포넌트의 함수 호출
    setIsOpen(false); // 아이템을 클릭하면 리스트 닫기
  };

  const renderItems = () => {
    return items.map((item) => (
      <ItemButton
        key={item.id}
        onClick={() => handleItemClick(item)}
        isActive={selectedItem && selectedItem.id === item.id}
      >
        {item.title}
      </ItemButton>
    ));
  };

  return (
    <div>
      <DropdownButton onClick={toggleList}>
        {selectedItem ? selectedItem.title : "카테고리를 선택하세요"}
        <ArrowIcon>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</ArrowIcon>
      </DropdownButton>
      {isOpen && <ItemList>{renderItems()}</ItemList>}{" "}
      {/* isOpen 상태에 따라 렌더링 */}
    </div>
  );
};

export default FilteringByCategory;
