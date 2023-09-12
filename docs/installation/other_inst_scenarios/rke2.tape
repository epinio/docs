Output ../../../static/img/rke2.gif

Set FontSize 14
Set Width 1100
Set Height 700
Set WindowBar Rings
Set Padding 5
Set Margin 5
Set MarginFill "#30BA78"
Set TypingSpeed 50ms

Hide
Type "ssh -X 192.168.122.109"
Enter
Sleep 2
Type "sudo bash"
Enter
Type "cd"
Enter
Show
Sleep 1s

Type "curl -sfL https://get.rke2.io | sh -"
Sleep 500ms
Enter
Sleep 10s
Type "systemctl enable --now rke2-server.service"
Sleep 500ms
Enter
Sleep 50s
Type "export PATH=$PATH:/var/lib/rancher/rke2/bin:/opt/rke2/bin"
Sleep 500ms
Enter
Sleep 1s
Type "export KUBECONFIG=/etc/rancher/rke2/rke2.yaml"
Sleep 500ms
Enter
Sleep 1s
Type "kubectl get pods --all-namespaces"
Sleep 500ms
Enter
Sleep 10s
Type "curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash"
Sleep 500ms
Enter
Sleep 10s
Type `kubectl patch ingressClass nginx -p '{"metadata": {"annotations":{"ingressclass.kubernetes.io/is-default-class": "true"}}}'`
Sleep 500ms
Enter
Sleep 10s
Type "kubectl get storageclass"
Sleep 500ms
Enter
Sleep 10s
Type "kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml"
Sleep 500ms
Enter
Sleep 10s
Type `kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'`
Sleep 500ms
Enter
Sleep 10s
Type "kubectl get storageclass"
Sleep 500ms
Enter

Type "echo 'The end.'"
Sleep 500ms
Enter

Sleep 15s
