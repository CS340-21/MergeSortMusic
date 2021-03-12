//merge_1_sort.cpp
//Georgia Stricklen
//This program sorts using merge sort.

#include <iostream>
#include <vector>
#include <cstdlib>
#include <cstring>
#include <stdio.h>
#include <algorithm>
#include <string>
#include "sorting.hpp"
using namespace std;

//Helper function that implements merge sort.
void recursive_sort(vector <string> &v, vector <string> &temp, int start, int size, int print);

//Calls resursive_sort and prints out final sorted vector.
void sort_songs(vector <string> &v, bool print){
	//Temp vector that will hold sorted vector as recursive sort is called.
	vector<string> tmp;
	size_t i;
	bool out = true;
	tmp.resize(v.size());
	//Print out final vector.
	recursive_sort(v, tmp, 0, v.size(), out);
	printf("\n");
	for(i = 0; i < v.size(); i++) printf("%s\n", v[i].c_str());
	printf("\n");
}

void recursive_sort(vector <string> &v, vector <string> &temp, int start, int size, int print){
	string tmp;
	bool p = true;
	int j, k;
	size_t i;
	int vote;

	//If the size being considered is less than or equal to 1, return
	if(size <= 1){
		return;
	}

	//Print out current vector
//	for(i = 0; i < v.size(); i++) printf("%s\n", v[i].c_str());
//	printf("\n");

	//If the size being considered is equal to 2, then sort manually, print out the vector, and return
	if(size == 2){
		//Ask user which song the prefer.
		if(v[start].compare(v[start+1]) == 0) return;
		printf("Type 1 for: %s\nType 2 for: %s\n", v[start].c_str(), v[start+1].c_str());
		scanf("%d", &vote);
		printf("\n");
		

		if(vote == 2){
			tmp = v[start];
			v[start] = v[start+1];
			v[start+1] = tmp;
		}



//		for(i = 0; i < v.size(); i++) printf("%s\n", v[i].c_str());
//		printf("\n");
	
		return;
	}

	//Call function on first half of considered portion of vector
	recursive_sort(v, temp, start, size/2, p);
	
	//Call function on other half of considered portion of vector
	recursive_sort(v, temp, start+size/2, size-size/2, p);

	//Look at sorted halves of the portion considered and determine what value in the i and j position
	//is the smallest (i is the beginning and j is the middle of the section). Place smaller value in
	//temperary vector and increment i or j depending on which value was put into the temp vector.
	j = size/2;
	int d = 0;
	for(k = 0; k < size; k++){
		//Print current playlist
//		printf("\n");
//		for(i = 0; i < v.size(); i++) printf("%s\n", v[i].c_str());
//		printf("\n");

		//Prompt user for choice.
		if(v[d+start].c_str() == NULL){
//			printf("Null on d\n");
		}else if(v[j+start].c_str() == NULL){
//			printf("Null on j\n");		
		}else{
			printf("Type 1 for: %s\nType 2 for: %s\n", v[d+start].c_str(), v[j+start].c_str());
			scanf("%d", &vote);
			printf("\n");
			if((vote == 1 || j >= size) && d < size/2){
				temp[k+start] = v[d+start];
				d++;
			}else{
				temp[k+start] = v[j+start];
				j++;
			}
		}
	}

	//Copy over the temp vector to v.
	for(j = 0; j < size; j++){
		v[j+start] = temp[j+start];
	}

	//Print out the vector again.
//	for(i = 0; i < v.size(); i++) printf("%s\n", v[i].c_str());
//	printf("\n");
	return;

}


