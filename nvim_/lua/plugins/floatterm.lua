return {
  {
    'voldikss/vim-floaterm',
    config = function()
      vim.keymap.set("n", "<C-'>", ':FloatermToggle<CR>')
    end
  }
}
