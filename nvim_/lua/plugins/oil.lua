
return {
  {
    "stevearc/oil.nvim",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    config = function()
      CustomOilBar = function()
        local path = vim.fn.expand "%"
        path = path:gsub("oil://", "")

        return "  " .. vim.fn.fnamemodify(path, ":.")
      end

      require("oil").setup {
        columns = { "icon" },
        win_options = {
          winbar = "%{v:lua.CustomOilBar()}",
        },
        view_options = {
          show_hidden = true,
        },
      }
      -- Open parent directory in floating window
      vim.keymap.set("n", "-", require("oil").toggle_float)
    end,
  },
}
