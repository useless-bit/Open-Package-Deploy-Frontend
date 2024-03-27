export class InstallScriptUtility {

  public getLinuxInstallScript(registrationToken: string, backendURL: string): string {
    return `cd ~
mkdir temp-opd-agent
cd temp-opd-agent

Token='${registrationToken}'
Host='${backendURL}'

wget --method GET --header 'Authentication: '$Token --output-document - $Host/download/agent -O 'Agent.jar'

sudo systemctl stop opd-agent

mkdir -p /etc/OPD-Agent
cp Agent.jar /etc/OPD-Agent/Agent.jar
echo "Server.Url="$Host >> /etc/OPD-Agent/opd-agent.properties
echo "Server.Registration-Token="$Token >> /etc/OPD-Agent/opd-agent.properties



apt-get update
apt-get install -y openjdk-19-jre-headless

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

cd ~
rm -r temp-opd-agent
`
  }

}
