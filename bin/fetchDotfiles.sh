#!/bin/bash
cp -r ~/.config/alacritty ~/dotfiles
cp -r ~/.config/i3 ~/dotfiles
cp -r ~/.config/i3status ~/dotfiles
cp -r ~/.config/nvim ~/dotfiles
cp -r ~/.config/polybar ~/dotfiles
cp -r ~/.config/rofi ~/dotfiles
cp -r ~/.config/tmux/tmux.conf ~/dotfiles/tmux
cp -r ~/.config/picom ~/dotfiles
cp -r ~/bin ~/dotfiles
cp -r ~/.bashrc ~/dotfiles
cp -r ~/.config/Code\ -\ OSS/User/keybindings.json ~/dotfiles/vscode
cp -r ~/.config/Code\ -\ OSS/User/settings.json ~/dotfiles/vscode



cd ~/dotfiles
git add .
git commit -m"auto"
git push

 

