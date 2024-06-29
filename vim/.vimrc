set nocompatible
filetype on
filetype plugin on
filetype indent on
syntax on
set number
set tabstop=4
set shiftwidth=4
set expandtab
inoremap jj <Esc>
set relativenumber
set autoread


colorscheme quiet 

let mapleader = " "
nnoremap <leader>n  vim.cmd.Ex
nnoremap <leader>c ggVG"+y
nnoremap <C-a> ggVG
nnoremap <C-b> :w<CR>:!g++ -std=c++17 -Wshadow -Wall -o a.out % -g -fsanitize=undefined -D_GLIBCXX_DEBUG && ./a.out<CR>
nnoremap <C-c> "+y
nnoremap <C-c> "+yy
nnoremap <C-u> <C-u>zz
nnoremap <C-d> <C-d>zz




