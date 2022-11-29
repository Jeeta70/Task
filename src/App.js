import { useState } from "react";
import "./App.css";

function Block({ list, handleClickCheckbox }) {
  return (
    <>
      <div style={{ border: "1px solid black" }}>
        {list.block}
        {list?.checkBoxLists?.map((checkBox, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={checkBox}
              name={checkBox}
              value={checkBox}
              onChange={(e) => handleClickCheckbox(e, index)}
            />
            <label htmlFor={checkBox}>{checkBox}</label>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  let charCode = 65;
  const [lists, setList] = useState([
    {
      block: `Block ${String.fromCharCode(charCode++)}`,
      checkBoxLists: ["Apple", "Mango", "Banana"],
    },
    {
      block: `Block ${String.fromCharCode(charCode++)}`,
      checkBoxLists: [],
    },
  ]);

  const [checkedList, setCheckedList] = useState([]);
  const handleClickCheckbox = (e) => {
    if (e.target.checked) {
      setCheckedList([...checkedList, e.target.value]);
    } else {
      checkedList.splice(checkedList.indexOf(e.target.value), 1);
      setCheckedList([...checkedList]);
    }
  };

  const handleFrontButton = () => {
    // console.log("lists",checkedList);
    lists.forEach((list, index) => {
      // console.log("list=>",list)
      let moveIndex = -1;
      let moveItem = "";
      debugger
      list.checkBoxLists.forEach((checkBoxItem,i) => {
        // console.log(list,checkBoxItem);
        const ans = checkedList.includes(checkBoxItem);
        // console.log(checkedList,checkBoxItem);
        // console.log(ans);
        console.count()
        if (ans) {
          moveIndex = i;
          moveItem = checkBoxItem;
          console.log(moveIndex, moveItem);
          // console.log(moveIndex)
          list.checkBoxLists.splice(moveIndex,1)
          // console.log(lists);
        }
      });
      console.log(list);

      // if(moveIndex !== -1){
      //   lists[++moveIndex] = moveItem
      // }
    });
  };

  return (
    <>
      {lists.map((list, index) => (
        <div key={index}>
          <Block
            list={list}
            handleClickCheckbox={handleClickCheckbox}
          />
        </div>
      ))}
      <button type="button">Back</button>
      <button type="button" onClick={handleFrontButton}>
        Front
      </button>
    </>
  );
}

export default App;
