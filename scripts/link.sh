#!/bin/bash

set -euo

DIR_ROOT=$(cd $(dirname $0)/.. && pwd)
FILENAME_LINKLIST="linklist.txt"

# make symbolic link

DIR_DOTFILES="${DIR_ROOT}/dotfiles"
FILE_LINKLIST="${DIR_ROOT}/${FILENAME_LINKLIST}"
cd "${DIR_DOTFILES}" 

if [ ! -r "${FILE_LINKLIST}" ] ; then
  return
fi

__remove_linklist_comment() {
  # '#'以降と空白行を削除
  sed -e 's/\s*#.*//' \
    -e '/^\s*$/d' \
    $1
}


while read -r target link
do
  target=$(eval echo "${PWD}/${target}")
  link=$(eval echo "${link}")

  mkdir -p $(dirname ${link})
  if [ -d "${link}" ] ; then
    rm -rf "${link}"
  fi
  ln -fsn ${target} ${link}
done < <( __remove_linklist_comment "${FILE_LINKLIST}" )

