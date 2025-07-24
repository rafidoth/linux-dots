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


struct ele{
    int index, stones;
};

bool cmp(ele a, ele b){
    return a.index < b.index;
}

void l000ser(){
    int n,m;
    cin >> n >> m;
    vector<int> x(m),a(m);
    int total_stones = 0;
    for(int i =0; i<m; i++) cin >> x[i];
    for(int i =0; i<m; i++) cin >> a[i], total_stones+=a[i];
    vector<ele> v(m);
    for(int i =0; i<m; i++){
        ele e;
        e.index = x[i];
        e.stones = a[i];
        v[i] = e;
    } 
    sort(v.begin(),v.end(), cmp);
    if(total_stones != n || v[0].stones < 1 ) cout << -1 << endl;
    else{
        ll ans = 0;
        for(int i = 1; i<m; i++){
            int stones_needed = v[i].index - v[i-1].index;
            if(v[i-1].stones < stones_needed){
                cout << -1 << endl;
                return;
            }else{
                v[i].stones += (v[i-1].stones - stones_needed);
                int N = stones_needed -1;
                ll opertation_count = (ll)N*(N+1);
                opertation_count /= 2;
                ans += opertation_count;
            }
            for(ele x : v){
                cout << x.stones << " ";
            }
            cout << endl;
        }
        ele last_ele = v.back();
        int last_stone_need = n - v.back().index;
        for(ele x : v){
            cout << x.stones << " ";
        }
        cout << endl;
        if(last_ele.stones==last_stone_need) cout << ans << endl;
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
