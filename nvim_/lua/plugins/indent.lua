local conf = {
    indent = {
        char = "|",
    },
    scope = {show_start = false,}
}
return {
  "lukas-reineke/indent-blankline.nvim",
  event = { "BufReadPre", "BufNewFile" },
  main = "ibl",
  config = function()
     require("ibl").setup(conf)
  end
}
