return {
  'xeluxee/competitest.nvim',
  dependencies = 'MunifTanjim/nui.nvim',
  config = function()
    vim.keymap.set("n", '<leader>nn', ':CompetiTest run<CR>')
    vim.keymap.set("n", '<leader>na', ':CompetiTest add_testcase<CR>')
    vim.keymap.set("n", '<leader>ne', ':CompetiTest edit_testcase<CR>')
    vim.keymap.set("n", '<leader>nm', ':CompetiTest show_ui<CR>')
    require('competitest').setup {
      testcases_use_single_file = true,
      compile_command = {
        cpp = { exec = "g++", args = { "-Wall", "-DLOOOSER", "$(FNAME)", "-o", "$(FNOEXT)" } },
      },
      run_command = {
        python = { exec = "python3", args = { "$(FNAME)" } },
      },
      runner_ui = {
        interface = "popup",
      },
      popup_ui = {
        total_width = 1,
        total_height = 1,
        layout = {
          { 4, "tc" },
          { 5, { { 1, "so" }, { 1, "si" } } },
          { 5, { { 1, "eo" }, { 1, "se" } } },
        },
      },
      split_ui = {
        position = "right",
        relative_to_editor = true,
        total_width = 0.4,
        vertical_layout = {
          { 0.1, "tc" },
          { 1, { { 1, "so" }, { 0, "eo" } } },
          { 1, { { 1, "si" }, { 0, "se" } } },
          { 0.2 ,"se"},
        },
        total_height = 0.4,
        horizontal_layout = {
          { 0.5, "tc" },
          { 3, { { 1, "so" }, { 1, "si" } } },
          { 3, { { 1, "eo" }, { 1, "se" } } },
        },
      },
    }
  end
}
