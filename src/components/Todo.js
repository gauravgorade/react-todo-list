import { useState, useEffect } from 'react';
import './style.css';


// Get Localstorage Data
const getLocalData = () => {
    const list = localStorage.getItem("myTodoList");
    if (list) {
        return JSON.parse(list)
    } else {
        return [];
    }
}


function Todo() {


    const [inputData, setInputData] = useState("");
    const [listItems, setlistItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, settoggleButton] = useState(false);



    // Add Item
    const addItems = () => {
        if (!inputData) {
            alert('Please enter your TODO.');
        } else if (inputData && toggleButton) {
            // Update list item
            setlistItems(listItems.map((item) => {
                if (item.id === isEditItem) {
                    return { ...item, name: inputData };
                }
                return item;
            }));
            setInputData("");
            setisEditItem("");
            settoggleButton(false);
        
        } else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setlistItems([...listItems, newInputData]);
            setInputData("");
        }
    }


    // Edit Item

    const editItem = (id) => {

        const getItem = listItems.find((item) => {
            return item.id === id;
        })
        setInputData(getItem.name);
        setisEditItem(id);
        settoggleButton(true);
    }

    // Delete Item
    const deleteItem = (id) => {

        const updatedItems = listItems.filter((item) => {
            return item.id === id;
        })
        setlistItems(updatedItems);

    }

    // Remove All
    const deleteAll = () => {
        if (listItems.length > 0) {
            if (window.confirm("Are you certain you want to erase all TODOs?")) {
                setlistItems([]);
            }
        } else {
            alert("Please put something in TODO to delete.")
        }
    }
    // Adding To Localstorage

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(listItems));
    }, [listItems]);





    return (
        <>
            <main>
                <div className="container">

                    <div className="header">
                        <h1>TO DO LIST</h1>
                    </div>
                    <div className="row">
                        <input type="text" name="todo_input" placeholder="New task" className="task-input" value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        <button onClick={addItems} className="btn-add" type="submit"><i className="fa-solid fa-plus "></i></button>
                        {toggleButton ?
                            (<button onClick={addItems} className="btn-add" type="submit"><i className="fa-solid fa-pen-to-square "></i></button>)
                            :
                            (<button onClick={addItems} className="btn-add" type="submit"><i className="fa-solid fa-plus "></i></button>)
                        }

                    </div>

                    <div className="scroll-list">
                        {listItems.map((listdata) => {

                            return (
                                <div className="todo-list-items" key={listdata.id}>
                                    <p>{listdata.name}</p>
                                    <button onClick={() => editItem(listdata.id)} className="btn-edit" type="submit"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button onClick={() => deleteItem(listdata.id)} className="btn-delete" type="submit"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            );

                        })};
                    </div>
                    <div className="remove-all">
                        <button onClick={() => deleteAll()} className="btn-remove-all" type="submit">Delete All</button>
                    </div>
                </div>
            </main>
        </>


    );

}
export default Todo;
