import './Month.scss'
import Nav from "../components/Nav";
import Goals from "../components/Goals";
import Button from '../components/Button';
import { useParams } from 'react-router-dom';

const Month = () => {
    const { month } = useParams();

    const shotGoal = [
        "단기목표 1",
        "단기목표 2",
        "단기목표 3",
    ]

    const longGoal = [
        "장기목표 1",
        "장기목표 2",
    ]

    return (
        <section className="content">
            <article className="month-goal">
                <h1 className="title-lg">{month}월 목표</h1>
                <div>
                    <Goals
                        subTit={'단기'}
                        goalList={shotGoal}
                    />
                    <Goals
                        subTit={'장기'}
                        goalList={longGoal}
                    />
                </div>
            </article>
            <article className='month-habit'>
                <div className="fnc-area">
                    <h1 className="l-area title-lg">{month}월 Habit Tracker</h1>
                    <Button
                        text={'edit'}
                        type={'sm'}
                    />
                </div>
                <div className='habit-list'>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                                <td>24</td>
                                <td>25</td>
                                <td>26</td>
                                <td>27</td>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                                <td>31</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>영양제 먹기</td>
                                <td>
                                    <input type="checkbox" id="1-1" />
                                    <label htmlFor="1-1"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-2" />
                                    <label htmlFor="1-2"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-3" />
                                    <label htmlFor="1-3"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-4" />
                                    <label htmlFor="1-4"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-5" />
                                    <label htmlFor="1-5"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-6" />
                                    <label htmlFor="1-6"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-7" />
                                    <label htmlFor="1-7"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-8" />
                                    <label htmlFor="1-8"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-9" />
                                    <label htmlFor="1-9"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-10" />
                                    <label htmlFor="1-10"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-1" />
                                    <label htmlFor="1-1"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-2" />
                                    <label htmlFor="1-2"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-3" />
                                    <label htmlFor="1-3"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-4" />
                                    <label htmlFor="1-4"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-5" />
                                    <label htmlFor="1-5"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-6" />
                                    <label htmlFor="1-6"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-7" />
                                    <label htmlFor="1-7"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-8" />
                                    <label htmlFor="1-8"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-9" />
                                    <label htmlFor="1-9"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-10" />
                                    <label htmlFor="1-10"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-1" />
                                    <label htmlFor="1-1"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-2" />
                                    <label htmlFor="1-2"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-3" />
                                    <label htmlFor="1-3"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-4" />
                                    <label htmlFor="1-4"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-5" />
                                    <label htmlFor="1-5"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-6" />
                                    <label htmlFor="1-6"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-7" />
                                    <label htmlFor="1-7"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-8" />
                                    <label htmlFor="1-8"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-9" />
                                    <label htmlFor="1-9"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-10" />
                                    <label htmlFor="1-10"></label>
                                </td>
                                <td>
                                    <input type="checkbox" id="1-31" />
                                    <label htmlFor="1-31"></label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    )
}

export default Month;