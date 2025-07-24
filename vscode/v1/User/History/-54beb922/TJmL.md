# Computer Architecture (CSE 3313)
This disicipline studies the structure of computer system made from component parts. Three main subcatagories.

- Instruction Set Architecute (ISA)
- Microarchitecture
- Systems Design



## Instruction Set Architecture (ISA)
<strong>Instruction Set Architecture (ISA)</strong> is the fundamental interface between software and hardware in a computer system. It defines the set of instructions a processor can understand and execute. It varies for different processors. x86, ARM, PowerPC, MIPS etc are differnt ISAs for different processors. 


<strong>MIPS (Microprocessor without Interlocked Pipelined Stages)</strong> is a family of reduced instruction set computer (RISC) instruction set architectures (ISA) developed by MIPS Computer Systems, now MIPS Technologies, based in the United States. Its a simple one to study for beginners.

# MIPS
- 32 registers only
- Each register $0, $1, $2, $3, ....., $31 
- Each of them can have a name like $t0 - $t7 ($8 - $15) are remporary registers
- Each register again 32 bits (4 Bytes) also known as one word


```
# Arithmetic instructions
add $s1, $s2, $s3   # $s1 = $s2 + $s3
sub $s1, $s2, $s3   # $s1 = $s2 - $s3

# Data transfer instructions
lw $s1, 100($s2)   # $s1 = Memory[$s2 + 100]
sw $s1, 100($s2)   # Memory[$s2 + 100] = $s1

# Logical instructions
and $s1, $s2, $s3    # $s1 = $s2 & $s3
or  $s1, $s2, $s3    # $s1 = $s2 | $s3
nor $s1, $s2, $s3    # $s1 = ~($s2 | $s3)
andi $s1, $s2, 100   # $s1 = $s2 & 100
ori $s1, $s2, 100    # $s1 = $s2 | 100
sll $s1, $s2, 10     # $s1 = $s2 << 10
srl $s1, $s2, 10     # $s1 = $s2 >> 10  


# Conditional branch instructions
beq $s1, $s2, L     # if ($s1 == $s2) go to L
bne $s1, $s2, L     # if ($s1 != $s2) go to L
slt $s1, $s2, $s3    # if ($s2 < $s3) $s1 = 1; else $s1 = 0
slt $s1, $s2, 100    # if ($s2 < 100) $s1 = 1; else $s1 = 0

# Unconditional jump instructions
j L                # go to L
jr $ra             # go to $ra (procedure return)
jal L              # $ra = PC + 4; go to L (procedure call)
```



