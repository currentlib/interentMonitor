#!/bin/bash

if [ -z $1 ] || [ -z $2 ]; then
        echo
        echo usage: $0 [network-interface] [path]
        echo
        echo e.g. $0 eth0 http://127.0.0.1:3000
        echo
        exit
fi

IF=$1

RX=0
TX=0
name=`cat /proc/sys/kernel/hostname`

for i in {1..5}
do
        R1=`cat /sys/class/net/$1/statistics/rx_bytes`
        T1=`cat /sys/class/net/$1/statistics/tx_bytes`
        sleep 1
        R2=`cat /sys/class/net/$1/statistics/rx_bytes`
        T2=`cat /sys/class/net/$1/statistics/tx_bytes`
        TX=`expr $TX +  $T2 - $T1`
        RX=`expr $RX +  $R2 - $R1`
done

RX=`bc <<< 'scale=3; '$RX'/5000'`
TX=`bc <<< 'scale=3; '$TX'/5000'`

for i in {1..50}
do
        curl -X POST -H "application/json" -d name=$name -d rx=$RX -d tx=$TX $2
done