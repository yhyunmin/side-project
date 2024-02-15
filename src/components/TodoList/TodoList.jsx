import { useEffect, useState } from 'react';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const today = new Date();
  const time = `${today.getHours()}${
    today.getMinutes() > 10 ? today.getMinutes() : '0' + today.getMinutes()
  }${today.getSeconds() > 10 ? today.getSeconds() : '0' + today.getSeconds()}`;

  const onClickCheck = id => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setList(newList);
  };
  const onClickDelete = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  };
  const onChangeTodo = e => {
    setInputValue(e.target.value);
  };

  const onClickAdd = e => {
    console.log('clicked');
    e.preventDefault();
    if (inputValue === '') {
      return null;
    }
    const data = { id: time, todo: inputValue, checked: false };
    setList(prev => [...prev, data]);
    setInputValue('');
  };
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('todo'));
    console.log(localData, 'load');
    if (localData) {
      setList(localData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(list));
    console.log(list, 'list');
  }, [list]);
  return (
    <div>
      <h1> 📝TodoList</h1>
      <h2>
        Today:{' '}
        {`${
          today.getMonth() + 1 > 10
            ? today.getMonth() + 1
            : '0' + parseInt(today.getMonth() + 1)
        }.${today.getDate()}
     
        ${week[today.getDay()]}
        `}
      </h2>
      <input type='text' value={inputValue} onChange={onChangeTodo} />
      <button onClick={onClickAdd}>Add</button>
      <ul>
        {list &&
          list.map(item => {
            return (
              <li key={item.id}>
                <input
                  type='checkbox'
                  defaultChecked={item.checked}
                  onClick={() => onClickCheck(item.id)}
                />
                <span>{item.todo}</span>
                <button onClick={() => onClickDelete(item.id)}>delete</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TodoList;
