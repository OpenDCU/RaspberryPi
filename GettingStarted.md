##Basic stuff...
```
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install git
```
###GFetting the stuff from githuib
1. Make yourself a github identity
2. install git (see secton above)
2. mkdir OpenDCU
3. cd OpenDCU
4. to use ssh: git clone git@github.com:OpenDCU/RaspberryPi.git
    or to use http: 

##Working headless
The way I work is to mount the image file in linux and hack /etc/networking/interfaces to configure a static address for the eth0, and plug it in to the ehternet port on my laptop. I use wireless to connect my laptop to the outside world and an extra wired ethernet adaptor to connect the pi to the main ethernet.

pi stuff:
```
iface eth0 inet static
address 10.0.0.2
netmask 255.255.255.240
```
Configuring the laptop interface to 10.0.0.1/255.255.255.240 then allows:
```
ssh pi@10.0.0.2
```

You will probably find that the routing on the pi is trying to use the 10.x network to reach the outside world. This can be fixed by
```
route add default gw 192.168.1.254
```
...or whatever the gateway IP address is.

***Longer term, fixing my laptop to provide a router with NAT, and a DCHP server (with hard-wired address allocation for the Pi) for the wired ethernet would allow the Pi to be run unmodified (and allow multiple Pi's to be connected easily too)***

##Installing Velleman K8055 drivers
The Velleman K8055 is an IO board with cute LEDs, DAC and stuff. It has a totally naff serial-protocol interface, but it is great for "proof of concept" hacking.

Runes from https://github.com/rm-hull/k8055
```
mkdir ~/velleman; cd ~/velleman
git clone https://github.com/rm-hull/k8055.git
cd k8055

sudo apt-get install libusb-dev swig libwxgtk2.8-dev python-dev
make all
sudo make install
make pylib k8055gui
sudo make pyinstall guiinstall
```
##Pythonc stuff
```
sudo apt-get install python-pip python2.7-dev build-essential 
```
Useful stuff about tornado at http://niltoid.com/blog/category/raspberry-pi/
```
sudo easy_install -U distribute
sudo pip install tornado
```