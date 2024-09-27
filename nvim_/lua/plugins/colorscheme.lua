return {
  'projekt0n/github-nvim-theme',
  name = 'github-theme',
  lazy = false, -- make sure we load this during startup if it is your main colorscheme
  priority = 1000, -- make sure to load this before all the other start plugins
  config = function()
    require("github-theme").setup({
      options = {
        transparent = true,
        styles = {
          comments = "italic",
          keywords = "bold",
        },
      },
      specs = {
        all = {
          syntax = {
            string = "#00573F",
            variable = "#660066",
            field = "#880000",
            func = "#000088",
            keyword = "#880000",
            number = "#006666",
          },
          diag = {
            hint = "#4fb8cc",
          },
        },
      },
    })
    vim.cmd('colorscheme github_light_high_contrast')
  end,
}
