vim.g.mapleader = " "
local km = vim.keymap
-- go back to netrw view
km.set("n", "<leader>bb", vim.cmd.Rex)
-- copy full file
km.set("n","<leader>cc",'ggVG"+y')
-- paste from "+
km.set("n","<C-p>",'"+p')
-- open vsplit
km.set("n","<leader>vw",':vsplit<CR>')
--open hsplit
km.set("n","<leader>hw",':hsplit<CR>')

--
-- run c++ file 
km.set("n", "<leader>nt", ":w<CR>:!g++ -std=c++17 -Wshadow -Wall -o a.out % -g -fsanitize=undefined -D_GLIBCXX_DEBUG && ./a.out<CR>")

-- Copy the selected text in visual mode to the system clipboard
km.set("v", "<C-c>", '"+y')

-- Copy the current line in normal mode to the system clipboard
km.set("n", "<C-y>", '"+yy')


-- remaps for splits
-- Move to the window above
km.set('n', '<C-k>', '<cmd>wincmd k<CR>', { noremap = true, silent = true })

-- Move to the window below
km.set('n', '<C-j>', '<cmd>wincmd j<CR>', { noremap = true, silent = true })

-- Move to the window to the left
km.set('n', '<C-h>', '<cmd>wincmd h<CR>', { noremap = true, silent = true })

-- Move to the window to the right
km.set('n', '<C-l>', '<cmd>wincmd l<CR>', { noremap = true, silent = true })

-- open IO cp
km.set('n','<leader>io',':OpenIO<CR>')

km.set('n','<leader>bl',':bnext<CR>')
km.set('n','<leader>bh',':bprev<CR>')
km.set('n','<leader>bq',':bd<CR>')
--new buffer
km.set('n','<leader>bn',':enew<CR>')
