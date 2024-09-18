import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import './Word.scss'
import { JournalStateContext, JournalDispatchContext } from "../App";

const width = 400
const height = 400

const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Word = () => {
    const { month } = useParams();
    const yearToNum = parseInt(month.split('_')[0], 10)
    const monthToNum = parseInt(month.split('_')[1], 10)
    const data = useContext(JournalStateContext)
    
    useEffect(() => {
        d3.select("#word-cloud").selectAll("svg").remove();

        const getGoals = (goalType) => data
            .filter(item => item.year === yearToNum)
            .flatMap(item => item.months
            .filter(months => months.month === monthToNum)
            .map(months => months.goals[goalType])
        ).flat();

        const getHabit = (habitType) => data
            .filter(item => item.year === yearToNum)
            .flatMap(item => item.months
            .filter(months => months.month === monthToNum)
            .flatMap(months => months.habits.map(habit => habit[habitType]))
        );

        let habitNm = getHabit('name');
        let long = getGoals('longTerm')
        let short = getGoals('shortTerm')

        const sumWords = [...habitNm.join(' ').split(' '), ...long.join(' ').split(' '), ...short.join(' ').split(' ')]

        const words = [...new Set(sumWords)]
            .map(function(d) {
                return { text: d, size: 10 + Math.random() * 90, color: randomColor() };
            });

            cloud()
            .size([width, height])
            .words(words)
            .padding(5)
            .rotate(() => Math.floor(Math.random() * 2) * 90)
            .fontSize(d => d.size)
            .on("end", draw)
            .start();

        function draw(words) {
            const svg = d3.select("#word-cloud")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            svg.selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d) { return d.color; })  // 랜덤 색상 적용
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    }, [yearToNum, monthToNum])

    return (
        <div className="content">
            <h1 className="title-lg">{monthToNum}월의 꿈</h1>
            <div id="word-cloud"></div>
        </div>
    )
}

export default Word;