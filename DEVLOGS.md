# Development tasks & issues

## Tasks
- [] - Develop the game globe
- [] - Develop the database
- [] - Finalize design
- [] - standardize the background globe
- [] - Fix the hero animation
- [] - Complete documentation
- [] - Finalize game logic
- [] - improve responsivity
- [] - Streamline version history interactions
- [] - implement testing 
- [] - Improve structure
- [] - Redo game page design
- [] - (iss.0.1) Other components block background globe interactivity
- [] - (iss.0.2) Standardize compSphere's error handling

-------------------------

18/11/2024 :
    
    Started by working on documentation. Added basic documentation to the root and
    started adding proper doc comments to the code blocks as I work with them.
    I thoghroughly analyzed the sphere component. (iss.0.1 :) I intend to link background's
    mouse events to the main screen, as to solve the blocking of this interactable element by
    other components. I think we can simply do this by passing a different second arg to `orbitControls` (CompSphere.js:52) (iss.0.2 :) I noticed a few seemingly bug-prone lines (CompSphere.js:95).
