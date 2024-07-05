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
set mouse=a


let mapleader = " "
nnoremap <leader>n  vim.cmd.Ex
nnoremap <leader>c ggVG"+y<C-O>
nnoremap <C-a> ggVG
nnoremap <C-b> :w<CR>:!g++ -std=c++17 -Wshadow -Wall -o a.out % -g -fsanitize=undefined -D_GLIBCXX_DEBUG && ./a.out<CR>
nnoremap <C-c> "+y
nnoremap <C-c> "+yy
nnoremap <C-k> zz<C-u>zz
nnoremap <C-j> zz<C-d>zz





augroup cpp_template
    autocmd!
    autocmd BufNewFile *.cpp 0r /home/rafidoth/temp.cpp
augroup END







