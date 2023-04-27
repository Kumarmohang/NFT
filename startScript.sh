# source /etc/bashrc
session=Artwork_Backend
# tmuxSessionPath='/data/tmux_shared/shared'
cdToWorkingDir='cd /demo_app/Project_Artwork_Backend/new_code'
serviceStart='npm run start'

/usr/bin/tmux   new -s $session -d
/usr/bin/tmux   send-keys -t 0 "$cdToWorkingDir" C-m
echo "Window 0 started"
# /usr/bin/tmux  rename-window -t 0 'test'
/usr/bin/tmux   new-window -t $session:1 -n 'Articurial'
/usr/bin/tmux   send-keys -t 1 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 1 "export ENV_PATH=./envs/.env.artcurial" C-m
/usr/bin/tmux   send-keys -t 1 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 1 'Articurial'
echo "Window 1 started"

/usr/bin/tmux   new-window -t $session:2 -n 'Christies'
/usr/bin/tmux   send-keys -t 2 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 2 "export ENV_PATH=./envs/.env.christies" C-m
/usr/bin/tmux   send-keys -t 2 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 2 'Christies'
echo "Window 2 started"

/usr/bin/tmux   new-window -t $session:3 -n 'Ketterer'
/usr/bin/tmux   send-keys -t 3 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 3 "export ENV_PATH=./envs/.env.ketterer" C-m
/usr/bin/tmux   send-keys -t 3 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 3 'Ketterer'

echo "Window 3 started"

/usr/bin/tmux   new-window -t $session:4 -n 'koller'
/usr/bin/tmux   send-keys -t 4 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 4 "export ENV_PATH=./envs/.env.koller" C-m
/usr/bin/tmux   send-keys -t 4 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 4 'Koller'
echo "Window 4 started"

/usr/bin/tmux   new-window -t $session:5 -n 'Kornfield'
/usr/bin/tmux   send-keys -t 5 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 5 "export ENV_PATH=./envs/.env.kornfield" C-m
/usr/bin/tmux   send-keys -t 5 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 5 'Kornfield'

echo "Window 5 started"

/usr/bin/tmux   new-window -t $session:6 -n 'Lempertz'
/usr/bin/tmux   send-keys -t 6 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 6 "export ENV_PATH=./envs/.env.lempertz" C-m
/usr/bin/tmux   send-keys -t 6 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 6 'Lempertz'
echo "Window 6 started"

/usr/bin/tmux   new-window -t $session:7 -n 'liveart'
/usr/bin/tmux   send-keys -t 7 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 7 "export ENV_PATH=./envs/.env.liveart" C-m
/usr/bin/tmux   send-keys -t 7 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 7 'liveart'

echo "Window 7 started"

/usr/bin/tmux   new-window -t $session:8 -n 'phillips'
/usr/bin/tmux   send-keys -t 8 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 8 "export ENV_PATH=./envs/.env.phillips" C-m
/usr/bin/tmux   send-keys -t 8 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 8 'phillips'


echo "Window 8 started"

/usr/bin/tmux   new-window -t $session:9 -n 'piasa'
/usr/bin/tmux   send-keys -t 9 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 9 "export ENV_PATH=./envs/.env.piasa" C-m
/usr/bin/tmux   send-keys -t 9 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 9 'piasa'

echo "Window 9 started"

/usr/bin/tmux   new-window -t $session:10 -n 'sotheby'
/usr/bin/tmux   send-keys -t 10 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 10 "export ENV_PATH=./envs/.env.sotheby" C-m
/usr/bin/tmux   send-keys -t 10 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 10 'sotheby'

echo "Window 10 started"

/usr/bin/tmux   new-window -t $session:11 -n 'swan'
/usr/bin/tmux   send-keys -t 11 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 11 "export ENV_PATH=./envs/.env.swan" C-m
/usr/bin/tmux   send-keys -t 11 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 11 'swan'

echo "Window 11 started"

/usr/bin/tmux   new-window -t $session:12 -n 'widewalls'
/usr/bin/tmux   send-keys -t 12 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 12 "export ENV_PATH=./envs/.env.widewalls" C-m
/usr/bin/tmux   send-keys -t 12 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 12 'widewalls'

echo "Window 12 started"

/usr/bin/tmux   new-window -t $session:13 -n 'pablo_ruiz'
/usr/bin/tmux   send-keys -t 13 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 13 "export ENV_PATH=./envs/.env.pablo_ruiz" C-m
/usr/bin/tmux   send-keys -t 13 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 13 'pablo_ruiz'

echo "Window 13 started"

/usr/bin/tmux   new-window -t $session:14 -n 'wikiart'
/usr/bin/tmux   send-keys -t 14 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 14 "export ENV_PATH=./envs/.env.wikiart" C-m
/usr/bin/tmux   send-keys -t 14 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 14 'wikiart'

echo "Window 14 started"

/usr/bin/tmux   new-window -t $session:15 -n 'artsy_artwork'
/usr/bin/tmux   send-keys -t 15 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 15 "export ENV_PATH=./envs/.env.artsy_artwork" C-m
/usr/bin/tmux   send-keys -t 15 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 15 'wikiart'

echo "Window 15 started"

/usr/bin/tmux   new-window -t $session:16 -n 'artbank'
/usr/bin/tmux   send-keys -t 16 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 16 "export ENV_PATH=./envs/.env.artbank" C-m
/usr/bin/tmux   send-keys -t 16 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 16 'artbank'

echo "Window 16 started"

/usr/bin/tmux   new-window -t $session:17 -n 'mutualart'
/usr/bin/tmux   send-keys -t 17 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 17 "export ENV_PATH=./envs/.env.mutualart" C-m
/usr/bin/tmux   send-keys -t 17 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 17 'mutualart'

echo "Window 17 started"

/usr/bin/tmux   new-window -t $session:18 -n 'artprice'
/usr/bin/tmux   send-keys -t 18 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 18 "export ENV_PATH=./envs/.env.artprice" C-m
/usr/bin/tmux   send-keys -t 18 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 18 'artprice'

echo "Window 18 started"

/usr/bin/tmux   new-window -t $session:19 -n 'artprice'
/usr/bin/tmux   send-keys -t 19 "$cdToWorkingDir" C-m
/usr/bin/tmux   send-keys -t 19 "export ENV_PATH=./envs/.env.bonhams" C-m
/usr/bin/tmux   send-keys -t 19 "$serviceStart" C-m
/usr/bin/tmux  rename-window -t 19 'artprice'

echo "Window 19 started"

# source /etc/bashrc
# session=simulator
# tmuxSessionPath='/data/users-workspace/tmux_shared/shared'
# cdToSimulator='cd /data/users-workspace/simulator/banking-simulator-backend'
# # startHDFC='PS1="HDFC => " ; npm start'
# # startSBI='PS1="SBI => " ; export NODE_ENV="production" ; npm start'


# /usr/bin/tmux  new -s $session -d
# /usr/bin/tmux  split-window -h -t $session:0
# echo "Split Window 0 started"

# /usr/bin/tmux  send-keys -t $session:0.0 "$cdToSimulator" C-m
# /usr/bin/tmux  send-keys -t $session:0.1 "$cdToSimulator" C-m

# /usr/bin/tmux  send-keys -t $session:0:0 "$startHDFC" C-m
# echo 'HDFC simulator started'

# /usr/bin/tmux  send-keys -t $session:0:1 "$startSBI" C-mexit
# echo 'SBI simulator started'