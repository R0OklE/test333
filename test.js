// let userSudoku = JSON.parse(localStorage.getItem('sudoku'));
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
if(localStorage.getItem('user')){
    sudokuBoard = JSON.parse(localStorage.getItem('user'));
}
else{
    sudokuBoard = generateSudoku();
}
for (let row = 0; row < 9; row++) 
{
console.log(sudokuBoard[row].join(" "));
}


//在页面输出数独
function displaySudoku() 
{
    if(localStorage.getItem('user')){
        sudokuBoard = JSON.parse(localStorage.getItem('user'));
    }
    else{
        sudokuBoard = generateSudoku();
    }
    
    const boardContainer = document.querySelector('.sudoku-board');
    const prototype = JSON.parse(localStorage.getItem('sudoku'));

    // 清空旧的数独格子
    boardContainer.innerHTML = '';

    // 创建数独格子并填充数字
    for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');//在HTML创建一个格子
        cell.addEventListener('click', handleCellClick);
        cell.classList.add('sudoku-cell');
        cell.dataset.row = row; // 存储行号
        cell.dataset.col = col; // 存储列号
        cell.textContent = sudokuBoard[row][col] !== 0 ? sudokuBoard[row][col] : '';
        if (sudokuBoard[row][col] !== 0 & prototype[row][col] !== 0) {
        cell.classList.add('filled');
        }
        boardContainer.appendChild(cell);
    }
    }
}
// 页面加载时显示数独
displaySudoku();


document.addEventListener('keydown', handleKeyDown);
function handleKeyDown(event) {
    // 获取按下的按键和对应的数字
    const key = event.key;
    const digit = parseInt(key);
    const prototype = JSON.parse(localStorage.getItem('sudoku'));
  
    // 判断按下的按键是否为数字1到9
    if (!isNaN(digit) && digit >= 1 && digit <= 9) {
      // 在数独格子中显示输入的数字
      const selectedCell = document.querySelector('.selected');
      if (selectedCell) {
        const row = parseInt(selectedCell.dataset.row);
        const col = parseInt(selectedCell.dataset.col);
        if(prototype[row][col] == 0){
            sudokuBoard[row][col] = digit;
            localStorage.setItem('user', JSON.stringify(sudokuBoard));
            selectedCell.textContent = digit;
        }
      }
    }
  }
  
function handleCellClick(event) {
    // 移除之前已选择格子的选择状态
    const previouslySelectedCell = document.querySelector('.selected');
    if (previouslySelectedCell) {
      previouslySelectedCell.classList.remove('selected');
    }
  
    // 为当前选择的格子添加选择状态
    const clickedCell = event.target;
    clickedCell.classList.add('selected');
  }

  //start清除本地数独按钮
var startButton = document.getElementById('start-button');
// "start"按钮的点击事件处理程序
function startButtonClickHandler() {
    // 清除本地存储中的数独数据
    localStorage.removeItem('user');
    
    // 重新生成新的数独
    const sudokuBoard = generateSudoku();
    
    // 进行其他操作，例如更新页面上的数独表格
    // updateSudokuBoard(sudokuBoard);
}
// 绑定"start"按钮的点击事件处理程序
startButton.addEventListener('click', startButtonClickHandler);
    