vim.cmd("set nocompatible")
vim.cmd("filetype on")
vim.cmd("filetype plugin on")
vim.cmd("filetype indent on")
vim.cmd("syntax on")
vim.cmd("set number")
vim.cmd("set tabstop=2")
vim.cmd("set shiftwidth=2")
vim.cmd("set expandtab")
vim.cmd("inoremap jj <Esc>")
vim.cmd("set relativenumber")
vim.cmd("set splitright")
vim.cmd("set splitbelow")
vim.cmd("set textwidth=0")
vim.cmd("set wrapmargin=0")
vim.cmd("set wrap")
vim.cmd("set linebreak")
vim.cmd("set breakindent")

require("remaps.remaps")

-- lazy vim plugin manager setup 
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- importing lua files from lua/plugins
require("lazy").setup("plugins")
vim.opt.background = "light"



vim.api.nvim_create_user_command('Temp', function()
  vim.cmd('r /home/rafidoth/temp.cpp')
end, {})

vim.api.nvim_create_user_command('Raw', function()
  vim.cmd('r /home/rafidoth/temp2.cpp')
end, {})

vim.api.nvim_create_user_command('LC', function()
  vim.cmd('r /home/rafidoth/leetcode.cpp')
end, {})

vim.api.nvim_create_user_command('Debug', function()
  vim.cmd('r /home/rafidoth/debug.txt')
end, {})

vim.api.nvim_create_user_command('CF', function()
  vim.cmd('r /home/rafidoth/cf.cpp')
end, {})

vim.api.nvim_create_user_command('OpenIO', function()
  vim.cmd('vsplit input.txt')
  vim.cmd('wincmd l')
  vim.cmd('split output.txt')
  vim.cmd('wincmd h')
end, {})
--
--

-- vim.api.nvim_create_autocmd("VimEnter", {
--   command = "Ex"
-- })
-- vim.api.nvim_create_autocmd("VimEnter", {
--   command = "bd"
-- })
