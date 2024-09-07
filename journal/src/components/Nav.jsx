const Nav = () => {
    return (
        <section className="tasks">
            <h2 className="title">TASKS</h2>

            <ul>
                <li className="year">
                    <input type="checkbox" id="2023" />
                    <label htmlFor="2023"><i className="ico-timeline"></i>2023</label>

                    <ul>
                        <li className="month current"><a href="#none"><i className="ico-plus"></i>11월</a></li>
                        <li><a href="#none">days</a></li>
                        <li><a href="#none">words</a></li>
                    </ul>
                </li>
                <li className="year">
                    <input type="checkbox" id="2024" />
                    <label htmlFor="2024"><i className="ico-timeline"></i>2024</label>
                </li>
                <li className="year">
                    <input type="checkbox" id="2025" />
                    <label htmlFor="2025"><i className="ico-timeline"></i>2025</label>
                </li>
            </ul>
        </section>
    )
}

export default Nav;