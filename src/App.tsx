import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    // let [todolists, setTodolists] = useState<Array<TodolistsType>>(
    //     [
    //         {id: v1(), title: 'What to learn', filter: 'all'},
    //         {id: v1(), title: 'What to buy', filter: 'all'},
    //     ]
    // )
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTodolist = (todolistId: string) => {
        // зачистить таски
        setTodolists(todolists.filter((el)=> el.id !== todolistId))
        delete tasks[todolistId]
    }

    function removeTask(todolistId: string, taskId: string) {
        // let filteredTasks = tasks.filter(t => t.taskId !== taskId);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = [newTask, ...tasks];
        // setTasks(newTasks);
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]); // старая реализация
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(((el)=> el.id === taskId ? {...el, isDone: newIsDone} : el))})
        // isDone при нажатии на чекбокс меняется на рпотивополжоное значение, а так чрезе МАП перезаписываем значение
        // что то удалить ФИЛЬТР что-то изменить МАП
    }


    function changeFilter(todolistId: string, filterValue: FilterValuesType) {
        setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: filterValue} : el))
    }


    return (
        <div className="App">
            {todolists.map((t) => {

                let tasksForTodolist = tasks[t.id]; // здесь формируем массив тасок используя id которое одинаково
                // для тасок и для туду листа, т.е. сейчас у нас вложенность и массив тасок вложен в таскс, мы к нему
                // доступ получаем. И ниже по строкам тоже самое делаем

                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={t.id}
                        todolistId={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
