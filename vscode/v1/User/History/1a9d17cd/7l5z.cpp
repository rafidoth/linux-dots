//g++ -DRafi a.cpp -o a -Wall -Wshadow && ./a
// https://pastebin.com/NsJYkkV9
#include <bits/stdc++.h>
using namespace std;

typedef long long int ll ;
typedef unsigned long long int ull ;
const int md = 1000000007;
#define len(c) int(c.size())
#define fill(x, y) memset(x, y, sizeof(x))
#define all(x) x.begin(), x.end()
#define sortall(x) sort(all(x))
#define dsortall(x) sort(all(x),greater<int>())
#define X first
#define Y second

void l000ser(){
    int n,m;
    cin >> n >> m;
    vector<int> x(m),a(m);
    map<int,int> mp; 
    int total_stones = 0;
    for(int i =0; i<m; i++) cin >> x[i];
    for(int i =0; i<m; i++) cin >> a[i], total_stones+=a[i];
    for(int i =0; i<m; i++) mp[x[i]] = a[i];
    vector<int> arr(n+1,0);
    int ans = 0;
    if(total_stones != n ) cout << -1 << endl;
    else{
        int source = 1;
        if(mp[source] < 1){
            cout << -1 << endl;
            return;
        }
        for(int i =1; i<=n; i++){
            if(mp[i]!=0){
                arr[i] = mp[i]; 
                if(arr[source]>1 && source!=1) arr[i] += (arr[source]-1);
                source = i;
            }else{
                ans+= (i-source);
                arr[i] = 1;
                arr[source]--;
                if(arr[source]<1){
                    cout << -1 << endl;
                    return;
                }
            }
        }
        if(arr.back()==1) cout << ans << '\n';
        else cout << -1 << endl;
    }
}

int main(){
    #ifdef Rafi 
        auto start_time = std::chrono::high_resolution_clock::now();
        freopen("input.txt", "r", stdin);
    #endif
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int tt;
    //cin >> tt;
    tt = 1;
    while(tt--) l000ser();


    #ifdef Rafi 
        auto end_time = std::chrono::high_resolution_clock::now();
        chrono::duration<double> runtime = end_time - start_time;
        cout << ">>>> Runtime: " << runtime.count() << " seconds" << std::endl;
    #endif
}
