
  
// 生成数独并在控制台显示
if(localStorage.getItem('user2')){
    sudokuBoard = JSON.parse(localStorage.getItem('user2'));
  }
  else{
    sudokuBoard = JSON.parse(localStorage.getItem('sudoku2'));
  }
  for (let row = 0; row < 9; row++) 
  {
  console.log(sudokuBoard[row].join(" "));
  }
  
  
  //在页面输出数独
  function displaySudoku()
  {
  
       sudokuBoard = JSON.parse(localStorage.getItem('user2'));
      if(sudokuBoard){
          ;
      }
      else{
          sudokuBoard = JSON.parse(localStorage.getItem('sudoku2'));
      }
      const boardContainer = document.querySelector('.sudoku-board');
      const prototype = JSON.parse(localStorage.getItem('sudoku2'));
  
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
      const prototype = JSON.parse(localStorage.getItem('sudoku2'));
    
      // 判断按下的按键是否为数字1到9
      if (!isNaN(digit) && digit >= 1 && digit <= 9) {
        // 在数独格子中显示输入的数字
        const selectedCell = document.querySelector('.selected');
        if (selectedCell) {
          const row = parseInt(selectedCell.dataset.row);
          const col = parseInt(selectedCell.dataset.col);
          if(prototype[row][col] == 0){
              sudokuBoard[row][col] = digit;
              localStorage.setItem('user2', JSON.stringify(sudokuBoard));
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
      localStorage.removeItem('user2');
      
      // 重新生成新的数独
      const sudokuBoard = generateSudoku();
      
      // 进行其他操作，例如更新页面上的数独表格
      // updateSudokuBoard(sudokuBoard);
  }
  // 绑定"start"按钮的点击事件处理程序
  startButton.addEventListener('click', startButtonClickHandler);


  //hint提示某处的数独答案
var hintButton = document.getElementById('hint-button');
// "hint"按钮的点击事件处理程序
function hintButtonClickHandler() {
  const solution = JSON.parse(localStorage.getItem('solution2'));
  const selectedCell = document.querySelector('.selected');
  const row = parseInt(selectedCell.dataset.row);
  const col = parseInt(selectedCell.dataset.col);
  const cell = document.querySelector('.hint-digit');
  
  //cell.classList.add('sudoku-cell');
  cell.textContent = solution[row][col];
}
// 绑定"start"按钮的点击事件处理程序
hintButton.addEventListener('click', hintButtonClickHandler);