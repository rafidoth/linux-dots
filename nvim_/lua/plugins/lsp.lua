return {
    {
        "williamboman/mason.nvim",
        config = function()
            require("mason").setup()
        end
    },
    {
        "williamboman/mason-lspconfig.nvim",
        config = function()
            require("mason-lspconfig").setup({
                ensure_installed = {
                    "clangd",
                    "eslint",
                    "lua_ls",
                    "tsserver",
                }
            })
        end
    },
    {
        "neovim/nvim-lspconfig",
        config = function()
            local c = require("lspconfig")
            local cap = require('cmp_nvim_lsp').default_capabilities()
            c.tsserver.setup({
                on_attach = function()
                    print("tsserver lsp attached")
                end
            })
            c.lua_ls.setup({
                capabilities = cap,
                on_attach = function()
                    print("lua lsp attached")
                end
            })
            c.clangd.setup({
                capabilities = cap,
                on_attach = function()
                    print("c++ lsp attached")
                end
            })
            c.eslint.setup({})
            local opts = { buffer = bufnr, noremap = true, silent = true }
            vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
            vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, opts)
            vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
            vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, opts)
            vim.keymap.set('n', '<leader>dj', vim.diagnostic.goto_next, opts)
            vim.keymap.set('n', '<leader>dk', vim.diagnostic.goto_prev, opts)
            vim.keymap.set('n', '<leader>gl', ":Telescope diagnostics<CR>", opts)
        end
    },
    {
        'WhoIsSethDaniel/toggle-lsp-diagnostics.nvim',
        config = function()
            vim.keymap.set('n', '<leader>tt', function()
                vim.diagnostic.enable(not vim.diagnostic.is_enabled())
            end, { silent = true, noremap = true })
        end

    }

}
