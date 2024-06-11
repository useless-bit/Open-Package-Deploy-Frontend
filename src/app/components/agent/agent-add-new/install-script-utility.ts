export class InstallScriptUtility {

  public getLinuxInstallScript(registrationToken: string, backendURL: string): string {
    return `cd ~
mkdir temp-opd-agent
cd temp-opd-agent

Token='${registrationToken}'
Host='${backendURL}'

function install_apt {
apt-get update
apt-get install -y openjdk-19-jre-headless

install_service_systemd
}

function stop_service_systemd {
sudo systemctl stop opd-agent
}

function install_service_systemd {
bash -c "cat > /etc/systemd/system/opd-agent.service <<EOF
[Unit]
Description=OPD Agent
After=network.target network-online.target
Requires=network-online.target

[Service]
WorkingDirectory=/etc/OPD-Agent
ExecStartPre=/bin/sh -c 'if [ ! -e Agent.jar ]; then cp Agent_backup.jar Agent.jar; fi && if [ -e Agent_update.jar ]; then java -jar Agent_update.jar; fi'
ExecStart=java -jar Agent.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl start opd-agent
sudo systemctl enable opd-agent
sudo systemctl status opd-agent
}

wget --method GET --header 'Authentication: '$Token --output-document - $Host/download/agent -O 'Agent.jar'

stop_service_systemd

mkdir -p /etc/OPD-Agent
cp Agent.jar /etc/OPD-Agent/Agent.jar
echo "Server.Url="$Host >> /etc/OPD-Agent/opd-agent.properties
echo "Server.Registration-Token="$Token >> /etc/OPD-Agent/opd-agent.properties

if command -v apt > /dev/null; then
install_apt
fi

cd ~
rm -r temp-opd-agent
`
  }


  public getWindowsInstallScript(registrationToken: string, backendURL: string): string {
    return `cd (gi $env:temp).fullname

$token="${registrationToken}"
$host_url="${backendURL}"

New-Item -ItemType Directory -Path .\\temp-opd-agent
cd temp-opd-agent

Invoke-WebRequest -Uri "https://cdn.azul.com/zulu/bin/zulu21.32.17-ca-jdk21.0.2-win_x64.msi" -OutFile "java.msi"

Start-Process -FilePath "msiexec" -ArgumentList "/i java.msi /quiet /qn /norestart ADDLOCAL=ZuluInstallation,FeatureJavaHome,FeatureEnvironment" -NoNewWindow -Wait

$headers = @{ Authentication = $token }
Invoke-WebRequest -Uri "$host_url/download/agent" -Headers $headers -OutFile "Agent.jar"

New-Item -ItemType Directory -Path "\${env:ProgramFiles}\\OPD-Agent"

Copy-Item -Path "Agent.jar" -Destination "\${env:ProgramFiles}\\OPD-Agent\\Agent.jar"

Add-Content -Path "\${env:ProgramFiles}\\OPD-Agent\\opd-agent.properties" -Value "Server.Url=$host_url"
Add-Content -Path "\${env:ProgramFiles}\\OPD-Agent\\opd-agent.properties" -Value "Server.Registration-Token=$token"

$action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c cd \${env:ProgramFiles}\\OPD-Agent && (IF NOT EXIST Agent.jar (copy Agent_backup.jar Agent.jar)) && (IF EXIST Agent_update.jar (java -jar Agent_update.jar)) && (java -jar Agent.jar)"
$trigger = New-JobTrigger -Once -At "1/1/2000 0:00 AM" -RepetitionInterval (New-TimeSpan -Minute 1) -RepetitionDuration ([TimeSpan]::MaxValue)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Days 365) -Priority 10
Register-ScheduledTask -TaskName "OPD-Agent" -Trigger $trigger -User "SYSTEM" -Action $action -RunLevel Highest -Settings $settings -Force

Start-ScheduledTask -TaskName "OPD-Agent"

cd (gi $env:temp).fullname
Remove-Item -Path .\\temp-opd-agent -Recurse
`
  }


  public getMacOSInstallScript(registrationToken: string, backendURL: string): string {
    return `cd ~
mkdir temp-opd-agent
cd temp-opd-agent

Token='${registrationToken}'
Host='${backendURL}'

arch=$(uname -m)
if [ "$arch" == "arm64" ]; then
   echo "Installing Java for ARM"
   curl https://cdn.azul.com/zulu/bin/zulu21.32.17-ca-jdk21.0.2-macosx_aarch64.dmg -o java.dmg
elif [ "$arch" == "x86_64" ]; then
   echo "Installing Java for x86"
   curl https://cdn.azul.com/zulu/bin/zulu21.32.17-ca-jdk21.0.2-macosx_x64.dmg -o java.dmg
fi

hdiutil mount java.dmg -mountpoint /Volumes/opd-java-installer
cd /Volumes/opd-java-installer
sudo installer -pkg *.pkg -target "/"

cd ~
cd temp-opd-agent

hdiutil detach /Volumes/opd-java-installer

curl -X GET -H "Authentication: $Token" -o Agent.jar $Host/download/agent

mkdir -p /etc/OPD-Agent
cp Agent.jar /etc/OPD-Agent/Agent.jar
echo "Server.Url="$Host >> /etc/OPD-Agent/opd-agent.properties
echo "Server.Registration-Token="$Token >> /etc/OPD-Agent/opd-agent.properties

content=$(cat <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
   <key>Label</key>
   <string>org.codesystem.opd-agent</string>
   <key>ProgramArguments</key>
   <array>
     <string>/bin/sh</string>
     <string>-c</string>
     <string>if [ ! -e Agent.jar ]; then cp Agent_backup.jar Agent.jar; fi &amp;&amp; if [ -e Agent_update.jar ]; then java -jar Agent_update.jar; fi; java -jar Agent.jar</string>
   </array>
   <key>RunAtLoad</key>
   <true/>
   <key>KeepAlive</key>
   <true/>
   <key>WorkingDirectory</key>
   <string>/etc/OPD-Agent</string>
   <key>StartInterval</key>
   <integer>15</integer>
</dict>
</plist>
EOF
)
echo "$content" > /Library/LaunchDaemons/opd-agent.plist

launchctl unload -w /Library/LaunchDaemons/opd-agent.plist
launchctl stop -w /Library/LaunchDaemons/opd-agent.plist
launchctl load -w /Library/LaunchDaemons/opd-agent.plist
launchctl start -w /Library/LaunchDaemons/opd-agent.plist

cd ~
rm -r temp-opd-agent
`
  }

}
