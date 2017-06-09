export default (data) => `
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">${data.rightAnswerCount}</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${data.statistic}% &nbsp;игроков</span>
`;
