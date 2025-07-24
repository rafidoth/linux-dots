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
    int n,x,y; 
    cin >> n >> x >> y;
    string path;
    cin >> path;
    int p = 0;
    int q = 0;
    for(char g : path){
        if(g=='N') q++;
        else if(g =='S') q--;
        else if(g =='E') p++;
        else if(g =='W') p--;
    }
    cout << p << " " << q << endl; 
    if(p <= 0 || q <= 0){
        cout <<"NO\n";
    } else if(x%p == 0 && y%q==0 ) cout << "YES\n";
    else cout << "NO\n";
}

int main(){
    #ifdef Rafi 
        auto start_time = std::chrono::high_resolution_clock::now();
        freopen("input.txt", "r", stdin);
    #endif
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int tt;
    cin >> tt;
    //tt = 1;
    while(tt--) l000ser();


    #ifdef Rafi 
        auto end_time = std::chrono::high_resolution_clock::now();
        chrono::duration<double> runtime = end_time - start_time;
        cout << ">>>> Runtime: " << runtime.count() << " seconds" << std::endl;
    #endif
}
