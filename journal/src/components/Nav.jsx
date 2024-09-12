import Button from "./Button"
import './Nav.scss'
import { useReducer, useState, useEffect } from 'react';


const Nav = () => {

    const buttons = [
        "delete",
        "add",
    ]

    return (
        <section className="nav">
            <h2 className="title">TASKS</h2>

            <ul>
                <li>
                    <input type="checkbox" id="2023" />
                    <label htmlFor="2023">2023</label>

                    <ul>
                        <li><button type="button" className="current">11월</button></li>
                        <li><button type="button">days</button></li>
                        <li><button type="button">words</button></li>
                    </ul>

                    <ul>
                        <li><button type="button">12월</button></li>
                        <li><button type="button">days</button></li>
                        <li><button type="button">words</button></li>
                    </ul>
                </li>

                <li>
                    <input type="checkbox" id="2024" />
                    <label htmlFor="2024">2024</label>
                </li>
            </ul>

            <div className="btn-cont">
                {buttons.map(button => (
                    <Button
                        key={button}
                        type={button === 'add' ? 'POSITIVE' : ''}
                        text={button}
                    />
                ))}
            </div>
        </section>
    )
}

export default Nav