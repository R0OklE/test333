
function generateNewSudoku(a)
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
    localStorage.setItem('solution' + a, JSON.stringify(board));

  
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
function generateSudoku(i) 
{
    // 检查本地存储中是否存在数独数据
    const storedSudoku = localStorage.getItem('sudoku' + i);
    if (storedSudoku) {
      return JSON.parse(storedSudoku); // 使用存储的数独数据
    }
  
    // 生成新的数独
    const sudoku = generateNewSudoku(i);
    
    // 存储数独数据到本地存储
    localStorage.setItem('sudoku' + i, JSON.stringify(sudoku));
  
    return sudoku;
}
  
  // 将数独输出到页面上
  function displaySudoku(sudoku, container, a) {
    var sudokuElement = document.createElement("div");
    sudokuElement.className = "sudoku";
    const solutionBoard = JSON.parse(localStorage.getItem('solution' + a));
    const userBoard = JSON.parse(localStorage.getItem('user' + a));
  
    // 创建数独格子
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        var cell = document.createElement("div");
        cell.className = "sudoku-cell";
        if(sudoku[i][j]){
            cell.textContent = sudoku[i][j];
            cell.classList.add('filled');
        }
        else if(userBoard){
            cell.textContent = solutionBoard[i][j];
            if(solutionBoard[i][j] == userBoard[i][j]){
              cell.classList.add('true');
            }
            else{
              cell.classList.add('false');
            }
        }
        else{
          cell.textContent = solutionBoard[i][j];
          cell.classList.add('false');
        }
        
        sudokuElement.appendChild(cell);
      }
    }
  
    container.appendChild(sudokuElement);
  }
  
  // 并发生成九个数独并显示在页面上
  function generateAndDisplayNineSudokus() {
    var container = document.getElementById("sudoku-container");
  
    // 使用Promise.all来并发生成九个数独
    var promises = [];
    for (var i = 0; i < 9; i++) {
      var promise = new Promise(function(resolve) {
        var sudoku = generateSudoku(i);
        resolve(sudoku);
      });
  
      promises.push(promise);
    }
  
    Promise.all(promises).then(function(results) {
      // 显示生成的九个数独
      for (let i = 0; i < results.length; i++) {
        displaySudoku(results[i], container, i);
      }
      
      console.log("九个数独生成并显示完成");
    });
  }
  

  
  // 调用函数来生成并显示九个数独
  generateAndDisplayNineSudokus();