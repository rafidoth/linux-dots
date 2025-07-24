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
<br>
<b>Catagories of Network</b>

- Local Area Network
- Wide Area Network
- Metropolitan Area Network

<br>
<br>
<b>Switched WAN</b><br>
<img src ="image copy 5.png"/>
<b>Point to Point WAN</b><br>
<img src ="image copy 6.png"/>

<br>
<br>
<br>

<b>Protocols</b>

- set of rules in the context of data communication that both sender and reciever maintains

<br>
Elements of Protocols
<br>

- Syntax<br>
    - Structure / format of data
    - indicates how to read the bits 
- Semantics<br>
    - interprets the meaning of the bit
    - knows which field defines what action
- Timing
    - When what data should be sent
    - data transmission speed
<br>



# Lecture 2
Think about the process how a letter get sent through postman to the receipiant. We write letter then (1) we package the letter in an envelope (2) we write the address of the receipiant on top of envelope. (3) then we add stamp paper on top of envelope (4) Then we post the letter in the postbox after that the postman takes all letters from the postbox and from this point after some more steps required to reach the receipiant and then the receipiant checks if its for him or not  and if its for him then he opens it up. Similar things happen in the network context too. If we call these steps layer then similarly in the network context we have different layers for processing the data for sending and receiving.  



- What is Layer in Network Context ?<br>
In the context of data communication both the process of sending and receiving data goes through certain steps where similar kinds of functionalities happens to make the data ready for a proper communication. These steps can be said as Layer. 

<br>

<center><img  src="image copy 7.png" width="500"/></center>

ISO declared OSI Model as the standard network communication model to be followed. Though later on TCP\IP came into the picture and most people adapted with TCP\IP. 

- How many layers are there in OSI MODEL?
<br>7 layers and they are <br>
<center><img  src="image copy 8.png" width="300"/></center>
















        






