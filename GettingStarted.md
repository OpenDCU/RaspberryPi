##Installing Velleman K8055 drivers
The Velleman K8055 is an IO board with cute LEDs, DAC and stuff. It has a totally naff serial-protocol interface, but it is great for "proof of concept" hacking.

Runes from https://github.com/rm-hull/k8055
```
sudo apt-get install libusb-dev swig libwxgtk2.8-dev
make all
sudo make install
make pylib k8055gui
sudo make pyinstall guiinstall
```
