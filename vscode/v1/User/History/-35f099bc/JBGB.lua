vim.g.mapleader = " "
vim.g.maplocalleader = "\\"


local function show_toast(message)
	vim.notify(message, vim.log.levels.INFO, {
		title = "Startup Message",
		timeout = 5000, -- Adjust as needed
	})
end

local function delayed_toast(message)
	vim.defer_fn(function()
		show_toast(message)
	end, 0)
end
-- plugins start here
local plugs = {
	{
		"yetone/avante.nvim",
		event = "VeryLazy",
		lazy = false,
		version = false,
		opts = {
			provider = "copilot",
			auto_suggestions_provider = "copilot",
		},
		-- More explicit build configuration
		build = function()
			-- Check if we're on Windows
			if vim.fn.has("win32") == 1 then
				vim.fn.system("powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false")
			else
				-- For Unix-like systems
				local build_cmd = [[
                cd $(pwd) && \
                make clean && \
                make BUILD_FROM_SOURCE=true
            ]]
				vim.fn.system(build_cmd)
			end
		end,
		-- Your existing dependencies remain the same
		dependencies = {
			"stevearc/dressing.nvim",
			"nvim-lua/plenary.nvim",
			"MunifTanjim/nui.nvim",
			"hrsh7th/nvim-cmp",
			"nvim-tree/nvim-web-devicons",
			"zbirenbaum/copilot.lua",
			{
				"HakonHarnes/img-clip.nvim",
				event = "VeryLazy",
				opts = {
					default = {
						embed_image_as_base64 = false,
						prompt_for_file_name = false,
						drag_and_drop = {
							insert_mode = true,
						},
						use_absolute_path = true,
					},
				},
			},
			{
				"MeanderingProgrammer/render-markdown.nvim",
				opts = {
					file_types = { "markdown", "Avante" },
				},
				ft = { "markdown", "Avante" },
			},
		},
		config = function()
			delayed_toast("Avante loaded") -- Added toast notification
		end,
	},
	{
		"adelarsq/image_preview.nvim",
		event = "VeryLazy",
		config = function()
			require("image_preview").setup()
			delayed_toast("image_preview loaded") -- Added toast notification
		end,
	},
	-- {
	-- 	"lukas-reineke/indent-blankline.nvim",
	-- 	main = "ibl",
	-- 	---@module "ibl"
	-- 	---@type ibl.config
	-- 	opts = {},
	-- 	config = function()
	-- 		require("ibl").setup({
	-- 			indent = {
	-- 				char = "|",
	-- 				-- highlight = { "Function", "Label" },
	-- 				smart_indent_cap = true,
	-- 				priority = 2,
	-- 				repeat_linebreak = false,
	-- 			},
	-- 		})
	-- 	end,
	-- },
	{
		"folke/trouble.nvim",
		opts = {}, -- for default options, refer to the configuration section for
		-- custom setup.
		cmd = "Trouble",
		keys = {
			{
				"<leader>tx",
				"<cmd>Trouble diagnostics toggle<cr>",
				desc = "Diagnostics (Trouble)",
			},
			{
				"<leader>tX",
				"<cmd>Trouble diagnostics toggle filter.buf=0<cr>",
				desc = "Buffer Diagnostics (Trouble)",
			},
			{
				"<leader>cs",
				"<cmd>Trouble symbols toggle focus=false<cr>",
				desc = "Symbols (Trouble)",
			},
			{
				"<leader>cl",
				"<cmd>Trouble lsp toggle focus=false win.position=right<cr>",
				desc = "LSP Definitions / references / ... (Trouble)",
			},
			{
				"<leader>tL",
				"<cmd>Trouble loclist toggle<cr>",
				desc = "Location List (Trouble)",
			},
			{
				"<leader>tQ",
				"<cmd>Trouble qflist toggle<cr>",
				desc = "Quickfix List (Trouble)",
			},
		},
		config = function()
			delayed_toast("trouble loaded") -- Added toast notification
		end,
	},
	{
		"toppair/peek.nvim",
		event = { "VeryLazy" },
		build = "deno task --quiet build:fast",
		config = function()
			-- default config:
			require("peek").setup({
				auto_load = true, -- whether to automatically load preview when
				-- entering another markdown buffer
				close_on_bdelete = true, -- close preview window on buffer delete

				syntax = true, -- enable syntax highlighting, affects performance

				theme = "dark", -- 'dark' or 'light'

				update_on_change = true,

				app = "webview", -- 'webview', 'browser', string or a table of strings
				-- explained below

				filetype = { "markdown" }, -- list of filetypes to recognize as markdown

				-- relevant if update_on_change is true
				throttle_at = 200000, -- start throttling when file exceeds this
				-- amount of bytes in size
				throttle_time = "auto", -- minimum amount of time in milliseconds
				-- that has to pass before starting new render
			})
			vim.api.nvim_create_user_command("PeekOpen", require("peek").open, {})
			vim.api.nvim_create_user_command("PeekClose", require("peek").close, {})
			delayed_toast("peek loaded") -- Added toast notification
		end,
	},
	{
		"ray-x/go.nvim",
		dependencies = { -- optional packages
			"ray-x/guihua.lua",
			"neovim/nvim-lspconfig",
			"nvim-treesitter/nvim-treesitter",
		},
		config = function()
			require("go").setup()
			local format_sync_grp = vim.api.nvim_create_augroup("goimports", {})
			vim.api.nvim_create_autocmd("BufWritePre", {
				pattern = "*.go",
				callback = function()
					require("go.format").goimports()
				end,
				group = format_sync_grp,
			})
			delayed_toast("go.nvim loaded") -- Added toast notification
		end,
		event = { "CmdlineEnter" },
		ft = { "go", "gomod" },
		build = ':lua require("go.install").update_all_sync()', -- if you need to
		-- install/update all binaries
	},
	{
		"stevearc/oil.nvim",
		opts = {},
		dependencies = { { "echasnovski/mini.icons", opts = {} } },
		config = function()
			require("oil").setup({
				default_file_explorer = true,
				icons = require("mini.icons"),
				columns = {
					"icon",
					--"permissions",
					"size",
					-- "mtime",
				},
				view_options = {
					show_hidden = true,
				},
				watch_for_changes = true,
				float = {
					-- Padding around the floating window
					padding = 4,
					-- max_width and max_height can be integers or a float between 0 and 1 (e.g. 0.4 for 40%)
					max_width = 40,
					max_height = 40,
					border = "rounded",
					win_options = {
						winblend = 0,
					},
					-- optionally override the oil buffers window title with custom function: fun(winid: integer): string
					get_win_title = nil,
					-- preview_split: Split direction: "auto", "left", "right", "above", "below".
					preview_split = "auto",
					-- This is the config that will be passed to nvim_open_win.
					-- Change values here to customize the layout
					override = function(conf)
						return conf
					end,
				},
			})

			delayed_toast("oil loaded") -- Added toast notification
		end,
	},
	{
		"kdheepak/tabline.nvim",
		config = function()
			require("tabline").setup({
				enable = true,
				options = {
					section_separators = { "", "" },
					max_bufferline_percent = 66,
					show_tabs_always = false,
					show_devicons = true,
					show_bufnr = false,
					show_filename_only = true,
					modified_icon = "+ ",
					modified_italic = false,
					show_tabs_only = false,
					tabline_show_last_separator = false,
				},
			})
			delayed_toast("tabline loaded") -- Added toast notification
		end,
	},
	{
		"ThePrimeagen/harpoon",
		dependencies = {
			"nvim-lua/plenary.nvim",
		},
		config = function()
			require("harpoon").setup({
				global_settings = {
					save_on_change = true,
					mark_branch = false,
				},
			})
			delayed_toast("harpoon loaded") -- Added toast notification
		end,
	},
	{
		"utilyre/barbecue.nvim",
		name = "barbecue",
		version = "*",
		dependencies = {
			"SmiteshP/nvim-navic",
			"nvim-tree/nvim-web-devicons", -- optional dependency
		},
		opts = {
			-- configurations go here
		},
		config = function()
			delayed_toast("barbecue loaded") -- Added toast notification
		end,
	},
	-- {
	-- 	"Mofiqul/vscode.nvim",
	-- 	config = function()
	-- 		local c = require("vscode.colors").get_colors()
	-- 		require("vscode").setup({
	-- 			transparent = true,
	-- 			italic_comments = true,
	-- 			underline_links = false,
	-- 			disable_nvimtree_bg = true,
	-- 			color_overrides = {
	-- 				vscLineNumber = "#FFFFFF",
	-- 			},
	-- 			group_overrides = {
	-- 				Cursor = { fg = c.vscDarkBlue, bg = c.vscLightGreen, bold = true },
	-- 			},
	-- 		})
	-- 		vim.cmd("colorscheme vscode")
	-- 	end,
	-- },
	-- {
	-- 	"folke/tokyonight.nvim",
	-- 	lazy = false,
	-- 	priority = 1000,
	-- 	opts = {},
	-- 	config = function()
	-- 	end,
	-- },
	-- },
	{
		"ellisonleao/gruvbox.nvim",
		priority = 1000,
		config = function()
			-- Default options:
			require("gruvbox").setup({
				terminal_colors = true, -- add neovim terminal colors
				undercurl = true,
				underline = true,
				bold = true,
				italic = {
					strings = true,
					emphasis = true,
					comments = true,
					operators = false,
					folds = true,
				},
				strikethrough = true,
				invert_selection = false,
				invert_signs = false,
				invert_tabline = false,
				invert_intend_guides = false,
				inverse = true, -- invert background for search, diffs,
				-- statuslines and errors
				contrast = "hard", -- can be "hard", "soft" or empty string
				palette_overrides = {},
				overrides = {},
				dim_inactive = false,
				transparent_mode = true,
			})
			vim.cmd("colorscheme gruvbox")
		end,
	},
	-- {
	-- 	"rose-pine/neovim",
	-- 	name = "rose-pine",
	-- 	config = function()
	-- 		require("rose-pine").setup({
	-- 			variant = "moon", -- auto, main, moon, or dawn
	-- 			dark_variant = "main", -- main, moon, or dawn
	-- 			dim_inactive_windows = true,
	-- 			extend_background_behind_borders = true,
	-- 			enable = {
	-- 				terminal = true,
	-- 				legacy_highlights = true, -- Improve compatibility for previous
	-- 				-- versions of Neovim
	-- 				migrations = true, -- Handle deprecated options automatically
	-- 			},
	--
	-- 			styles = {
	-- 				bold = true,
	-- 				italic = false,
	-- 				transparency = true,
	-- 			},
	-- 		})
	-- 		vim.cmd("colorscheme rose-pine")
	-- 		delayed_toast("rose-pine loaded") -- Added toast notification
	-- 	end,
	-- },
	-- {
	-- 	"olivercederborg/poimandres.nvim",
	-- 	lazy = false,
	-- 	priority = 1000,
	-- 	config = function()
	-- 		require("poimandres").setup({
	-- 			bold_vert_split = false, -- use bold vertical separators
	-- 			dim_nc_background = false, -- dim 'non-current' window backgrounds
	-- 			disable_background = true, -- disable background
	-- 			disable_float_background = false, -- disable background for floats
	-- 			disable_italics = false, -- disable italics
	-- 		})
	-- 		vim.cmd("colorscheme poimandres")
	-- 	end,
	-- },
	-- {
	-- 	"EdenEast/nightfox.nvim",
	-- 	config = function()
	-- 		require("nightfox").setup({
	-- 			options = {
	-- 				transparent = true, -- Disable setting background
	-- 			},
	-- 		})
	-- 		-- setup must be called before loading
	-- 		vim.cmd("colorscheme duskfox")
	-- 	end,
	-- },
	{
		"L3MON4D3/LuaSnip",
		dependencies = {
			"saadparwaiz1/cmp_luasnip",
			"rafamadriz/friendly-snippets",
		},
		config = function()
			delayed_toast("LuaSnip loaded") -- Added toast notification
		end,
	},
	{
		"wintermute-cell/gitignore.nvim",
		config = function()
			require("gitignore")
		end,
	},
	{
		"hrsh7th/nvim-cmp",
		config = function()
			local cmp = require("cmp")
			require("luasnip.loaders.from_vscode").lazy_load()

			cmp.setup({
				snippet = {
					expand = function(args)
						require("luasnip").lsp_expand(args.body)
					end,
				},
				mapping = cmp.mapping.preset.insert({
					["<C-b>"] = cmp.mapping.scroll_docs(-4),
					["<C-f>"] = cmp.mapping.scroll_docs(4),
					["<C-Space>"] = cmp.mapping.complete(),
					["<C-e>"] = cmp.mapping.abort(),
					["<CR>"] = cmp.mapping.confirm({ select = true }),
					["<Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_next_item()
						elseif require("luasnip").expand_or_jumpable() then
							require("luasnip").expand_or_jump()
						else
							fallback()
						end
					end, { "i", "s" }),
					["<S-Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_prev_item()
						elseif require("luasnip").jumpable(-1) then
							require("luasnip").jump(-1)
						else
							fallback()
						end
					end, { "i", "s" }),
				}),
				sources = cmp.config.sources({
					{ name = "nvim_lsp" },
					{ name = "luasnip" },
				}, {
					{ name = "buffer" },
				}),
			})
			delayed_toast("nvim-cmp loaded") -- Added toast notification
		end,
	},
	{
		"hrsh7th/cmp-nvim-lsp",
	},
	{
		"hrsh7th/cmp-buffer",
	},
	{
		"stevearc/conform.nvim",
		opts = {},
		config = function()
			require("conform").setup({
				formatters_by_ft = {
					lua = { "stylua" },
					javascript = { "prettierd", "prettier", stop_after_first = true },
				},
				format_on_save = {
					timeout_ms = 500,
					lsp_format = "fallback",
				},
			})
			delayed_toast("conform loaded") -- Added toast notification
		end,
	},
	{
		"github/copilot.vim",
		config = function()
			delayed_toast("copilot.vim loaded") -- Added toast notification
		end,
	},
	{
		"rcarriga/nvim-notify",
		config = function()
			require("notify").setup({
				-- Configuration options
			})
		end,
	},
	set,
}

-- lazy setup
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	local out = vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"--branch=stable",
		lazyrepo,
		lazypath,
	})
	if vim.v.shell_error ~= 0 then
		vim.api.nvim_echo({
			{ "Failed to clone lazy.nvim:\n", "ErrorMsg" },
			{ out, "WarningMsg" },
			{ "\nPress any key to exit..." },
		}, true, {})
		vim.fn.getchar()
		os.exit(1)
	end
end
vim.opt.rtp:prepend(lazypath)

-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- Setup lazy.nvim
require("lazy").setup({
	spec = plugs,
	-- Configure any other settings here. See the documentation for more details.
	-- colorscheme that will be used when installing plugins.
	install = { colorscheme = { "habamax" } },
	-- automatically check for plugin updates
	checker = { enabled = false },
})

local map = vim.keymap.set
map("n", "<C-e>", ":Telescope find_files<CR>")
map("n", "ff", ":Telescope live_grep <CR>")
-- buffers
-- map("n", "<S-CR>", ":Telescope buffers<CR>")
map("n", "m", ":bnext<CR>")
map("n", "n", ":bprevious<CR>")
map("n", "<C-w>", ":bdelete<CR>")
-- vim motions
map("n", "<C-j>", "5j0", { noremap = true, silent = true })
map("n", "<C-k>", "5k0", { noremap = true, silent = true })
map("n", "<C-l>", "3w", { noremap = true, silent = true })
map("n", "<C-h>", "3b", { noremap = true, silent = true })
map("n", "<C-s>", ":w<CR>", { noremap = true, silent = true })
map("i", "<C-s>", "<Esc>:w<CR>a", { noremap = true, silent = true })
map("v", "<C-s>", "<Esc>:w<CR>gv", { noremap = true, silent = true })
map("n", "<leader>q", ":q<CR>", { noremap = true, silent = true })
-- vim motions end

--
map("n", "<C-]>", ":vsp<CR>")
map("n", "<leader>e", ":lua vim.diagnostic.open_float(0, {scope='line'})<CR>")
map("n", "<BS>", ":GoDoc<CR>")
map("n", "<leader>hh", ":lua require('harpoon.ui').toggle_quick_menu()<CR>")
map("n", "<leader>hm", ":lua require('harpoon.mark').add_file()<CR>")
map("n", "<leader>h1", ":lua require('harpoon.ui').nav_file(1)<CR>")
map("n", "<leader>h2", ":lua require('harpoon.ui').nav_file(2)<CR>")
map("n", "<leader>h3", ":lua require('harpoon.ui').nav_file(3)<CR>")

function ToggleLineNumber()
	local absolute = vim.wo.number -- Get the current state of absolute line
	-- numbers
	if absolute then
		vim.wo.number = false
	else
		vim.wo.number = true
	end
end

-- Optional: Map the function to a key (e.g., <leader>n)
vim.api.nvim_set_keymap("n", "<leader>n", ":lua ToggleLineNumber()<CR>", {
	noremap = true,
	silent = true,
})
-- Copilot accept suggestion
vim.api.nvim_set_keymap("i", "<C-l>", "copilot#Accept('<CR>')", {
	expr = true,
	silent = true,
})

vim.api.nvim_create_user_command("OilToggle", function()
	if vim.bo.filetype == "oil" then
		vim.cmd("bd") -- Close the oil buffer
	else
		vim.cmd("Oil --float") -- Open oil in a floating window
	end
end, { nargs = 0 })
map("n", "<Tab>", ":OilToggle<CR>")
