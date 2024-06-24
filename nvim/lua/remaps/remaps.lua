vim.g.mapleader = " "
-- go back to netrw view
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)
-- copy full file
vim.keymap.set("n","<leader>c",'ggVG"+y')
-- run c++ file 
vim.keymap.set("n", "<leader>n", ":w<CR>:!g++ -std=c++17 -Wshadow -Wall -o a.out % -g -fsanitize=undefined -D_GLIBCXX_DEBUG && ./a.out<CR>")

-- Copy the selected text in visual mode to the system clipboard
vim.keymap.set("v", "<C-y>", '"+y')

-- Copy the current line in normal mode to the system clipboard
vim.keymap.set("n", "<C-y>", '"+yy')

