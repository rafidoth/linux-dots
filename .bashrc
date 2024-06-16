#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

colors() {
	local fgc bgc vals seq0

	printf "Color escapes are %s\n" '\e[${value};...;${value}m'
	printf "Values 30..37 are \e[33mforeground colors\e[m\n"
	printf "Values 40..47 are \e[43mbackground colors\e[m\n"
	printf "Value  1 gives a  \e[1mbold-faced look\e[m\n\n"

	# foreground colors
	for fgc in {30..37}; do
		# background colors
		for bgc in {40..47}; do
			fgc=${fgc#37} # white
			bgc=${bgc#40} # black

			vals="${fgc:+$fgc;}${bgc}"
			vals=${vals%%;}

			seq0="${vals:+\e[${vals}m}"
			printf "  %-9s" "${seq0:-(default)}"
			printf " ${seq0}TEXT\e[m"
			printf " \e[${vals:+${vals+$vals;}}1mBOLD\e[m"
		done
		echo; echo
	done
}

[ -r /usr/share/bash-completion/bash_completion ] && . /usr/share/bash-completion/bash_completion

# Change the window title of X terminals
case ${TERM} in
	xterm*|rxvt*|Eterm*|aterm|kterm|gnome*|interix|konsole*)
		PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME%%.*}:${PWD/#$HOME/\~}\007"'
		;;
	screen*)
		PROMPT_COMMAND='echo -ne "\033_${USER}@${HOSTNAME%%.*}:${PWD/#$HOME/\~}\033\\"'
		;;
esac

use_color=true

# Set colorful PS1 only on colorful terminals.
# dircolors --print-database uses its own built-in database
# instead of using /etc/DIR_COLORS.  Try to use the external file
# first to take advantage of user additions.  Use internal bash
# globbing instead of external grep binary.
safe_term=${TERM//[^[:alnum:]]/?}   # sanitize TERM
match_lhs=""
[[ -f ~/.dir_colors   ]] && match_lhs="${match_lhs}$(<~/.dir_colors)"
[[ -f /etc/DIR_COLORS ]] && match_lhs="${match_lhs}$(</etc/DIR_COLORS)"
[[ -z ${match_lhs}    ]] \
	&& type -P dircolors >/dev/null \
	&& match_lhs=$(dircolors --print-database)
[[ $'\n'${match_lhs} == *$'\n'"TERM "${safe_term}* ]] && use_color=true

if ${use_color} ; then
	# Enable colors for ls, etc.  Prefer ~/.dir_colors #64489
	if type -P dircolors >/dev/null ; then
		if [[ -f ~/.dir_colors ]] ; then
			eval $(dircolors -b ~/.dir_colors)
		elif [[ -f /etc/DIR_COLORS ]] ; then
			eval $(dircolors -b /etc/DIR_COLORS)
		fi
	fi

	if [[ ${EUID} == 0 ]] ; then
		PS1='\[\033[01;31m\][\h\[\033[01;36m\] \W\[\033[01;31m\]]\$\[\033[00m\] '
	else
		PS1='\[\033[01;32m\][\u@\h\[\033[01;37m\] \W\[\033[01;32m\]]\$\[\033[00m\] '
	fi

	alias ls='ls --color=auto'
	alias grep='grep --colour=auto'
	alias egrep='egrep --colour=auto'
	alias fgrep='fgrep --colour=auto'
else
	if [[ ${EUID} == 0 ]] ; then
		# show root@ when we don't have colors
		PS1='\u@\h \W \$ '
	else
		PS1='\u@\h \w \$ '
	fi
fi

unset use_color safe_term match_lhs sh

#alias cp="cp -i"                          # confirm before overwriting something
#alias df='df -h'                          # human-readable sizes
#alias free='free -m'                      # show sizes in MB
#alias np='nano -w PKGBUILD'
#alias more=less

xhost +local:root > /dev/null 2>&1

# Bash won't get SIGWINCH if another process is in the foreground.
# Enable checkwinsize so that bash will check the terminal size when
# it regains control.  #65623
# http://cnswww.cns.cwru.edu/~chet/bash/FAQ (E11)
shopt -s checkwinsize

shopt -s expand_aliases

# export QT_SELECT=4

# Enable history appending instead of overwriting.  #139609
shopt -s histappend

#Aliases
alias termdown1="termdown --no-figlet 30m"
alias termdown2="termdown --no-figlet 50m"
alias termdown3="termdown --no-figlet 1h30m"
alias termdown4="termdown --no-figlet 2h30m"
alias cdalgos="cd ~/Documents/algos/"
alias pushtogit="git add . && git commit -m"--" && git push"
alias n="nnn"
alias nh="nnn -H"
alias config="cd ~/.config/"
alias i3conf="nvim ~/.config/i3/config"
alias alconf="nvim ~/.config/alacritty/alacritty.toml"
alias routine="cat ~/routine.txt"
alias installfont="cp -a ./ /usr/share/fonts/TTF"
#vim
alias vimt="cat vim_navigation.txt"
alias nvimconf="nvim ~/.config/nvim/init.lua"
#xfce
alias panel="xfce4-panel"
#bash 
alias bashconf="nvim ~/.bashrc"
alias reloadbash="source ~/.bashrc"
alias go="cd ~/refactored-octo-robot/ && ls"
alias fifi="fzf --preview 'bat --style=numbers --color=always --line-range :500 {}'"
alias s='~/bin/save_i3.sh'
alias r='~/bin/restore_i3.sh'
alias gimp='gimp --as-new ~/Documents/Untitled.xcf'
setxkbmap -option "caps:escape" 


cpp() {
  # Check if a filename is provided
  if [ $# -eq 0 ]; then
    echo "Usage: create_cpp <filename>"
    return 1
  fi

  # Get the filename argument
  filename="$1"

  # Full path to the template file (assuming it's in your home directory)
  template_file="$HOME/temp.cpp"

  # Check if the template file exists
  if [ ! -f "$template_file" ]; then
    echo "Error: Template file '$template_file' does not exist."
    return 1
  fi

  # Copy the template content to the new file
  cp "$template_file" "$filename"

  # Check if the copy was successful
  if [ $? -eq 0 ]; then
    echo "Created new CPP file: '$filename'"
  else
    echo "Error: Failed to create file '$filename'"
  fi

  # Open the file with neovim
  nvim $filename
}

run() {
    if [ $# -eq 0 ]; then
        echo "Usage: run_with_arg <argument>"
        return 1
    fi
    
    run.sh "$1"
}


bind '"\C-o":"nvim_with_fzf\n"'
bind '"\C-f":"cd_with_fzf\n"'

cd_with_fzf() {
    cd && cd "$(fd -t d | fzf --reverse --preview="tree -L 1 {}" --bind="space:toggle-preview" --preview-window=:hidden)" && clear
}

nvim_with_fzf() {
    cd && nvim "$(fd -t d | fzf --reverse --preview="tree -L 1 {}" --bind="space:toggle-preview" --preview-window=:hidden)" && clear
}



[ -d /home/linuxbrew/.linuxbrew ] && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
eval "$(oh-my-posh init bash --config ~/ohmyposh/robbyrussell.omp.json)"

export PATH="$HOME/bin:$PATH"
export EDITOR=nvim
export VISUAL=nvim
export TERM=alacritty
