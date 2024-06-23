vim.cmd("set nocompatible")
vim.cmd("filetype on")
vim.cmd("filetype plugin on")
vim.cmd("filetype indent on")
vim.cmd("syntax on")
vim.cmd("set number")
vim.cmd("set tabstop=4")
vim.cmd("set shiftwidth=4")
vim.cmd("set expandtab")
vim.cmd("inoremap jj <Esc>")
vim.cmd("set relativenumber")


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
vim.opt.background = "dark"


vim.cmd([[
  augroup cpp_template
    autocmd!
    autocmd BufNewFile *.cpp 0r /home/raphy/temp.cpp 
  augroup END
]])

