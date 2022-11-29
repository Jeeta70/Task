import { useEffect, useState } from "react";
import "./App.css";

function Block({ list, handleClickCheckbox }) {
  return (
    <>
      <div
        style={{ border: "1px solid black", height: "auto", width: "100px" }}
      >
        <div>
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
      </div>
    </>
  );
}

function App() {
  let charCode = 65;
 let maxLength = 0
  const [lists, setList] = useState([
    {
      block: `Block ${String.fromCharCode(charCode++)}`,
      checkBoxLists: ["Apple", "Mango", "Banana"],
    },
    {
      block: `Block ${String.fromCharCode(charCode++)}`,
      checkBoxLists: [],
    },
    {
      block: `Block ${String.fromCharCode(charCode++)}`,
      checkBoxLists: [],
    },
  ]);

  const [checkedLists, setCheckedLists] = useState([]);

  useEffect(() => {
    lists.forEach((i) => {
      // console.log(i.checkBoxLists.length);
      if (maxLength < i.checkBoxLists.length) {
        maxLength = i.checkBoxLists.length
      }
    });
  }, []);


  const handleClickCheckbox = (e) => {
    if (e.target.checked) {
      setCheckedLists([...checkedLists, e.target.value]);
    } else {
      checkedLists.splice(checkedLists.indexOf(e.target.value), 1);
      setCheckedLists([...checkedLists]);
    }
  };

  const handleFrontButton = () => {
    checkedLists.forEach((checkList) => {
      let first = -1;
      lists.forEach((list, index) => {
        const ans = list.checkBoxLists.indexOf(checkList);
        if (ans !== -1) {
          first = index;
          list.checkBoxLists.splice(ans, 1);
        }
      });
      if (first !== -1) {
        lists[++first]?.checkBoxLists.push(checkList);
        first = -1;
      }
      setList([...lists]);
    });
    setCheckedLists([])
  };

  return (
    <>
      {lists.map((list, index) => (
        <div key={index}>
          <Block list={list} handleClickCheckbox={handleClickCheckbox} />
        </div>
      ))}
      <button type="button">Back</button>
      <button type="button">Add More</button>
      <button
        type="button"
        onClick={handleFrontButton}
        disabled={lists.at(-1).checkBoxLists.length > maxLength}
      >
        Front
      </button>
    </>
  );
}

export default App;
