require('base')
require('highlights')
require('maps')
require('plugins')

local has = function(x)
  return vim.fn.has(x) == 1
end

local is_mac = has "macunix"
local is_win = has "win32"
local is_linux = has "Linux"

