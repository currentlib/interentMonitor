if (($null -eq $args[0]) -or ($null -eq $args[1])) {
    Write-Host "Please, provide Adapter and Url as arguments 'Monitoring.ps1 WiFi http://<ip_address>:<port>'"
} else {
    $speedRX = 0
    $speedTX = 0

    #Write-Host $args[0]

    For ($i=0; $i -lt 10; $i++) {
        $bytesStartRX = (Get-NetAdapterStatistics -Name $args[0]).ReceivedBytes -as [int]
        $bytesStartTX = (Get-NetAdapterStatistics -Name $args[0]).SentBytes -as [int]
        sleep(1)
        $bytesEndRX = (Get-NetAdapterStatistics -Name $args[0]).ReceivedBytes -as [int]
        $bytesEndTX = (Get-NetAdapterStatistics -Name $args[0]).SentBytes -as [int]
        $speedRX = $speedRX + ($bytesEndRX - $bytesStartRX)
        $speedTX = $speedTX + ($bytesEndTX - $bytesStartTX)
    }

    $speedRX = $speedRX/10000
    $speedTX = $speedTX/10000

    #Write-Host $speedRX " | " $speedTX

    $Body = @{
        "name" = $env:COMPUTERNAME
        "rx" = $speedRX
        "tx" = $speedTX
    }

    Invoke-RestMethod $args[1] -Method Post -Body $body

}


