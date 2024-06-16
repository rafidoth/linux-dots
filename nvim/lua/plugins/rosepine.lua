return {
  {
         'rose-pine/neovim',
         name = "rose-pine",
         lazy = false,
         priority= 1000,
         config = function()
            local rosepine = require("rose-pine");
            rosepine.setup({
                disable_backgroound = true,
                styles = {
                    bold = true,
                    italic = false,
                    transparency = true,
                }
            })

         end
  }
}


















