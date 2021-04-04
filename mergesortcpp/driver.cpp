#include <iostream>
#include <vector>
#include <cstdlib>
#include <cstring>
#include <stdio.h>
#include <fstream>
#include "sorting.hpp"
using namespace std;

int main(int argc, char **argv){
	if(argc != 2){
		printf("usage: ./exe file");
		return 1;
	}
	
	vector <string> playlist;
	string line;
	fstream in;
	in.open(argv[1]);
	bool p;
	p = true;
	while(getline(in, line)){
		playlist.push_back(line);
	}

	sort_songs(playlist, p);

	in.close();
	return 0;

}
