# Computer Network



## Lecture 1

<b>Telecommunication</b>  </br> 
Communication at a distance.
</br>
</br>
<b>Data Communication</b> </br>
Exchange of data between two devices via some form of transmission medium.

<b>Data Communication Diagram</b> </br>
<img src="image.png">

<b>Data Communication Components</b> </br>

- Sender
- Receiver
- Medium
- Protocol (some set of rules agreed by both parties in data communication) 





<b>Data Flow</b> </br>

- Simplex 
- Half Duplex in walki-talkie <br>
- Full Duplex  in telephone<br>

<img src="image copy.png">



<br>
<br>
<b>Network </b> </br>
Set of Devices connected by communication medium <br>

- a device in a network in general called node. Any device in network called node.

- Devices in network which can process data are called host. For example : Printer can be a node but can't be a host and Computer can be a host and hence obviously its a node too. 


<b>Judging a Network</b> </br>
- Performance <br>  
    - How network elements are performing, its speed
    - can be measured in terms of Delay and throughput (a measure of rate of data transmission. Unit can be bits per second or Bytes per second or something like that)
- Reliability<br>
    - How the network recovers from a failure that gets expressed in terms of reliability.
    - Failure rate of network components
    - Measured in terms of availability/robustness

- Security <br>
    - data protection against corruption/loss of data due to 
        - Errors
        - Malicious Users

<br>
<br>
<b>Types of Connection</b><br>

- Point to Point<br>
    <img src="image copy 2.png">
- Multipoint<br>
    <img src="image copy 3.png">

<br>
<br>
<b>Types of Transmission</b><br>

- Unicast<br>
Single sender and single receiver 

- Multicast <br>
Receivers are a specified group of devices in network
- Broadcast <br>
Whoever present in network is a receiver.
- Geocast <br>
data transmission based on geographic location. It can be said its a variant of multicast.



<br>
<br>
<b>Topology</b><br>

- What is Network Topology ? <br>
::: Network Topology is the model/pattern/structure how different components of network are interconnected. 
- Physical Topology ? <br>
::: physical design of the network
- Logical Topology ? <br>
::: how data transmission happens in a network 

<b>Mesh Topology</b>

- All nodes are connected with each other
- Not fisible for larger network
- Partial mesh used in real world
- $\frac{n(n-1)}{2}$ number of cable needed to make mesh of n nodes
<img src="image copy 4.png">
<br>
<br>
<b>Hub / Star Topology</b>
<b>Bus Topology</b>

- All devices are connected to a single backbone/bus
- both ends of central trunk contain 
- limited number of devices 
- single point of failure (if the central cable fails the entire network goes down)
- Efficient for small networks


<b>Ring Topology</b>


<br>

        






