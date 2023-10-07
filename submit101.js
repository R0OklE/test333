function generateNewSudoku()
{
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    const bbd = [];
    // 使用递归算法填充数独
    function solveSudoku(row, col) {
      if (row === 9) {
        return true; // 当所有行都填满，数独解决
      }
  
      if (col === 9) {
        return solveSudoku(row + 1, 0); // 当前行填满，转到下一行
      }
  
      if (board[row][col] !== 0) {
        return solveSudoku(row, col + 1); // 已经有数字，继续下一列
      }
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      shuffleArray(numbers);
      for (const num of numbers) {
        if (isValid(row, col, num)) {
          board[row][col] = num;
          if (solveSudoku(row, col + 1)) {
            return true;
          }
          board[row][col] = 0; // 回溯
        }
      }
      return false;
    }
    //洗牌
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      
    // 检查当前位置是否可以放置数字
    function isValid(row, col, num) {
      // 检查当前行是否有重复数字
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
          return false;
        }
      }
  
      // 检查当前列是否有重复数字
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
          return false;
        }
      }
  
      // 检查当前3x3子格是否有重复数字
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (board[i][j] === num) {
            return false;
          }
        }
      }
  
      return true;
    }
  
    // 开始解数独
    solveSudoku(0, 0);
  
    // 根据难度级别去掉一些数字
    const difficultyLevels = {
      easy: 35,
      medium: 45,
      hard: 55,
    };
  
    const difficulty = "medium"; // 可以根据需要修改难度级别
    const emptyCells = difficultyLevels[difficulty];
    let emptyCellsCount = 0;
  
    while (emptyCellsCount < emptyCells) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        emptyCellsCount++;
      }
    }
  
    return board;
}

// 生成数独的函数
function generateSudoku() 
{
    // 检查本地存储中是否存在数独数据
    const storedSudoku = localStorage.getItem('sudoku');
    if (storedSudoku) {
      return JSON.parse(storedSudoku); // 使用存储的数独数据
    }
  
    // 生成新的数独
    const sudoku = generateNewSudoku();
    
    // 存储数独数据到本地存储
    localStorage.setItem('sudoku', JSON.stringify(sudoku));
  
    return sudoku;
}
  
  
// 生成数独并在控制台显示
const sudokuBoard = generateSudoku();
for (let row = 0; row < 9; row++) 
{
console.log(sudokuBoard[row].join(" "));
}


//在页面输出数独
function displaySudoku() 
{
    const sudokuBoard = generateSudoku();
    const boardContainer = document.querySelector('.sudoku-board');
    const solutionBoard = JSON.parse(localStorage.getItem('solution'));
    const userBoard = JSON.parse(localStorage.getItem('user'));

    // 清空旧的数独格子
    boardContainer.innerHTML = '';

    // 创建数独格子并填充数字
    for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');//在HTML创建一个格子
        cell.classList.add('sudoku-cell');
        if(sudokuBoard[row][col]){
            cell.textContent = sudokuBoard[row][col];
            cell.classList.add('filled');
        }
        else if(userBoard){
            cell.textContent = solutionBoard[row][col];
            if(solutionBoard[row][col] == userBoard[row][col]){
              cell.classList.add('true');
            }
            else {
              cell.classList.add('false');
            }
        }
        else{
          cell.textContent = solutionBoard[row][col];
          cell.classList.add('false');
        }
        boardContainer.appendChild(cell);
    }
    }
}
// 页面加载时显示数独
displaySudoku();