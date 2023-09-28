# 简要说明一下这些代码是怎么运行的
## Firstly
- 我们为网页写了亿点点的html和js配套文件，还有一些css文件来修改元素样式。下面一一说明每个文件所发挥的作用。
## Secondly
- 首先，如果你想打开我们的网页，就要先把库里的文件下载到本地中。
- 接着，先打开start.html，你将会看到以下界面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/03d9c0f80e51408384cc16fb0a9255c0.png#pic_center)
- 我们为这个页面添加了beautify.css文件来修改它背景的样式，之后的每个页面中也添加了这一文件。在页面中还添加了一个“PLAY”按钮，点击后可跳转到menu.html生成的MENU界面，如下图。
![在这里插入图片描述](https://img-blog.csdnimg.cn/8c182c5ef85e46b684b9c900c8c93042.png#pic_center)
- 该页面可以根据用户的喜好选择游戏难度，对应生成不同数量的数独。当用户鼠标悬浮在“DIFFICULTY”上即可选择难度。
![在这里插入图片描述](https://img-blog.csdnimg.cn/975dc01841e54dafacfd6eaa159cbe03.png#pic_center)
- 当然，在未选择难度之前，是进入不了下一个界面的，若用户执意点击“START”，会有一个弹窗警告，此操作由引入的menu.js实现。
![在这里插入图片描述](https://img-blog.csdnimg.cn/f2e7237fbd1840cba058e88b0949e85c.png#pic_center)
- 还有一个“EXIT”按钮，可以再次返回到一开始的界面。
- 选择难度后进入下一个界面，我们以“EASY”难度为例解释接下来代码的功能。
![在这里插入图片描述](https://img-blog.csdnimg.cn/0d98818af2c64a6d933c21978ff4a6c0.png#pic_center)
- 此页面由s_easy.html文件生成（hard难度由s_hard.html文件生成），点击“START”按钮后，将会执行easy_start.js中与该按钮有关的函数，该函数会先把之前保存到本地的数独数据清除，继而重新生成一个新的数独并保存在本地中（**此操作是为了让用户在做数独时，刷新页面后仍面对的是正在解的数独**）。接着就是跳转到下一个由game101.html生成的页面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/99743c402130498ab90870824413ef08.png#pic_center)
- 该界面引入了sudoku.css文件对生成的数独进行美化。
- 用户点击左上角的小房子可以返回到一开始的MENU界面重新选择难度 。点击小房子右边的音符可以播放出**动听的music**，给用户带来沉浸式的解数独体验，当然，若用户不想听，再次点击该按钮后可以切换播放状态，此功能由引入的audio.js文件实现。
- 接着是数独部分。用户**点击**所要填入的格子，就可以从键盘键入1到9的数字。当用户鼠标**悬停**到未填入数字的格子时，格子背景会有变化。
![在这里插入图片描述](https://img-blog.csdnimg.cn/d9413a4da0644870b98c74196a6b4311.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/df115769c0a94ba090f6df41aa0b9ab7.png#pic_center)
- 当用户想重新做的时候，可以点击旁边的“CLEAR”按钮对已填入的数字清空。当用户成功写完数独后，点击旁边的“SUBMIT”按钮进行提交，提交后跳转到由submit101.html生成的界面，该界面会显示该数独的正确答案，用户键入**正确**的位置和**错误**的位置会有背景色（***红色为错误，绿色为正确***）上的区分。
![在这里插入图片描述](https://img-blog.csdnimg.cn/d5f877783b064da7ba6cc4a8065b4a1f.png#pic_center)
- hard模式整体和easy模式差不多，不过有以下几点不同。
- 首先，选择hard难度开始后，你会跳转到由game102.html文件生成的界面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/f0c09121b4994f98aa3c6bf0aee42e58.png#pic_center)
- 该界面会显示生成的并发生成的九个数独，用户可以点击“ENTER”按钮进入到由game102_1.html文件生成的界面**逐个**对数独**求解**。
![在这里插入图片描述](https://img-blog.csdnimg.cn/af2aaec646264a268a8e848070a0a6cd.png#pic_center)
- 我们在数独盘面的右上角有页面切换按钮，点击后可以左右切换数独，进入由game102_**i**.html文件提供的界面，还有页码显示当前的数独编号。
![在这里插入图片描述](https://img-blog.csdnimg.cn/f47cd7fec86a4d8c9d7864675b18fd18.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/f7b656e4f6c04545ab9c29ad70bff876.png#pic_center)
- 最后，是SUBMIT按钮上的区别。点击该模式下的SUBMIT按钮后会进入由submit102.html生成的界面，该界面会一并显示出九个数独及答案，当然，用户所填入的正确和错误的位置也会有所区分。
![在这里插入图片描述](https://img-blog.csdnimg.cn/9baf0b1d0902452b9fad5f18bfe430bf.png#pic_center)
## Lastly
- ✨ **欢迎体验我们的SUDOKU ！！！** ✨
