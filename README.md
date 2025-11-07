# Frontend Template

You can use this repository as a template for your frontend. It provides a very simple
React Router layout with a navbar and an `AuthContext` with login and register pages.

## Usage

1. Change the name of the package in `package.json`.
2. Update the environment variables in `example.env` and rename the file to `.env`.
3. Build components and add routes to them in `App.jsx`.

------------------------------------
Frontend Readme

Installations:
npm install
npm bootstrap
npm i bootstrap
npm run dev
npm run build

Page 1 (S1) : Home Screen
	- It should have a tagline "Welcome to EZSplit" with logo.
	- It should have a prompt that allows customers to enter their table number.
	- It has a footer displaying contact details etc.

Page 2 (S2) : EZSplit Option Page
	- Logo should be displayed with tagline "Making Dining Fun".
	- Displays 2 buttons
		○ Pay in full button (this will require a function to be created to display amount on the next page)
		○ EZSplit button (for splitting bills)

( When a customer enters the table number on homepage in home.jsx, and clicks on the continue button, it should link to a new page that should be Created called "EZSplit Options" page. This EZSplit Options page should have the logo in the public folder displayed with the tagline "Making Dinning Fun". There should be two buttons. Button 1: Pay in Full. Button 2: EZSplit. )
		
Page 3 (S8) : Making full Payment Page
	- Logo should be displayed with the tagline "Making Dining fun"
	- There should be a display section with the total amount/bill to be paid
	- Create a form for entering payment information like
		○ Name on Card
		○ Card number
		○ Expiration date
	- Create a submit button
(Stretch goal: Tap card / Swipe/ Scan QR code)

( when a customer selects pay in full in ezSplitOptions.jsx, it should take them to a newly created page called make "Making Full Payment" page. the logo in the public folder should be displayed with the tagline "Making Dinning Fun". There should be a display section with the total amount/bill to be paid by customer. Create a form for customer to enter payment information like - name on credit card, card number, expiration date. Create a submit button. )
	
Page 4 (S9) : Receipt Page
	- Logo should be displayed with the tagline "Making Dining fun."
	- Pop up for customer to select receipt option.
		○ Enter email
		○ Enter phone number
		○ No receipt
	- Create a submit button

( From Making fullPaymentPage.jsx, when a customer selects process payment, it should take the customer to a new created page called "Receipt Page" in receipt.jsx. where the logo in the public folder is displayed with the tagline "Making Dinning Fun". If a customer wants a receipt via text, they should be able to enter their phone number. If a customer wants a receipt by email, she should be able to enter their email address. If a customer does not want a receipt, she should be given the chance to choose no receipt needed. )



Page 5 (S10): Payment Confirmation Page
	- Once the submit button is clicked, customers receive a pop up that ask them to confirm their information.

*****SKIP THIS*******
(When a customer clicks on the submit button on the Receipt page in receipt.jsx, it should take the customer to another page called the "Payment Confirmation" Page.)




Page 6 (S11) : Final Thank You Page
	- After the customer information has been confirmed, it displays the final page with a pop up text "Thank you for dining."
	- Logo should be displayed with tag line "Making dining fun."

( when a customer enters their email address or phone number or chooses no receipt option in receipt.jsx, it should take them to a new page called "Thank You" page in thankYou.jsx file. the logo in the public folder is displayed with the tagline "Making Dinning Fun". It displays the message "Thank you for dinning with us".  )


Page 7 (S3) : Number of Guest Page
	- From page 2 (S2) EZSplit Option page,
		○ If a customer selects EZSplit option of payment, it takes them to the number of guest page.
	- Logo should be displayed with tag line "Making dining fun."
	- A pop up that prompts customers to enter number of guest that would be splitting the bill.

( When a customer selects EZSplit payment option from ezSplitOptions.jsx file, it should take them to the "Number of Guest" new page built in the numberofGuests.jsx file. This new page should have EZSplit logo in public folder displayed with the tag line "Making Dining Fun!". The page should have a pop up that allows customers to enter the number of guest that would be splitting the bill.   )

Page 8 (S4) : EZSplit Payment Page
	- Logo should be displayed with tag line "Making dining fun."
	- Two prompt options for customers to select
		○ Split evenly
		○ Custom split

(When a customer enters the number of guest and clicks continue in the numberofGuests.jsx file, it should take them to a new page called "EZSplit Payment" page in ezSplit-PaymentPage.jsx file. the new page should give customers the option to split evenly or choose custom split. This new page should have EZSplit logo in public folder displayed with the tag line "Making Dining Fun!". )

Page 9 (S5) : Select Items Page --> for custom split option only
	- Logo should be displayed with tag line "Making dining fun."
	- Display list of items (It could have an option of a check box for customers to select more than 1 item)
	- Customer only gets billed for selected items.
	- run the back end with npm run dev. 
	- The table number entered will be used pull the menu id with that table id. 
	- When we put in the table number, it should pull the menu for 
	
	(When a customer selects custom split option in the ezSplit-PaymentPage.jsx, it should take them to a new page called "Select Item" page in the selectItems.jsx file. This new page should display the menu and their price from the backend menu table through the local host with a check box option. Once a customer selects these menu with prices, it should take them to another new page called "Custom Split" page in the customSplitPaymentPage.jsx file. where the total amount / bill from the selected items show for the customer to make payment by entering their credit card information which takes them to receipt page at the end. This new pages should have EZSplit logo in public folder displayed with the tag line "Making Dining Fun!". run the backend in EZSplit folder within the main CAPSTONE_EZSPLIT folder)

	(When a customer selects custom split option in the ezSplit-PaymentPage.jsx, it should take them to a new page called "Select Item" page in the selectItems.jsx file. This new page should display the menu items generated using Faker.js as seen in the seed script. Since the backend menu.js file is working perfectly with the actual database. their price from the backend menu table through the local host should be displayed with a check box option. Once a customer selects these menu with prices, it should take them to another new page called "Custom Split" page in the customSplitPaymentPage.jsx file. where the total amount / bill from the selected items show for the customer to make payment by entering their credit card information which takes them to receipt page at the end. This new pages should have EZSplit logo in public folder displayed with the tag line "Making Dining Fun!". run the backend in EZSplit folder within the main CAPSTONE_EZSPLIT folder)

Page 10 (S4 -> S6): Split Evenly Page
	- From Page 8 (S4) EZSplit Payment page, when a customer selects split evenly button, it takes them to the split evenly page
	- Logo should be displayed with tag line "Making dining fun."
	- Pop up displaying amount the customer is responsible for based on the selected items from the select items page.
	- Create a form for entering payment information like
		○ Name on Card
		○ Card number
		○ Expiration data
	- Create a submit button

( When a customer selects Split Evenly in the ezSplit-PaymentPage.jsx, it should take them to a new page called "Evenly Split" page within the splitEvenlyPaymentPage.jsx file. It will take the total amount and divide it by the number of guest and round it up to the nearest cent. There should be a display section with the total amount/bill to be paid by customer as captured under full payment in fullPaymentPage.jsx. Display the breakdown of the calculation. This new page should have EZSplit logo in public folder displayed with the tag line "Making Dining Fun!".)

(Stretch goal: Tap card / Swipe/ Scan QR code)

	- Once submit button is clicked, it continues to the receipt page (Page 4 (S9))
		--> Page 4 (S9) : Receipt Page
			- Logo should be displayed with the tagline "Making Dining fun."
			- Pop up for customer to select receipt option.
				○ Enter email
				○ Enter phone number
				○ No receipt
			- Create a submit button
		
	-  Then it continues to the confirmation page (Page 5 (S10))
		--> Page 5 (S10): Payment Confirmation Page
				○ Once the submit button is clicked, customers receive a pop up that ask them to confirm their information.
		
	- And it continues to the final thank you page (Page 6 (S11))
		--> Page 6 (S11) : Final Thank You Page
				○ After the customer information has been confirmed, it displays the final page with a pop up text "Thank you for dining."
				○ Logo should be displayed with tag line "Making dining fun."
		
Page 11 (S7) : Split Between X Amount Page
	- Logo should be displayed with tag line "Making dining fun."
	- From EZSplit Payment Page 8 (S4) when a customer selects custom split, it brings them to this page.
	- The customer gets a prompt to enter the split bill they will be paying.
	- Create a form for entering payment information like
		○ Name on Card
		○ Card number
		○ Expiration data
	- Create a submit button

(Stretch goal: Tap card / Swipe/ Scan QR code)

	- Once submit button is clicked, it continues to the receipt page (Page 4 (S9))
		--> Page 4 (S9) : Receipt Page
			- Logo should be displayed with the tagline "Making Dining fun."
			- Pop up for customer to select receipt option.
				○ Enter email
				○ Enter phone number
				○ No receipt
			- Create a submit button
		
	-  Then it continues to the confirmation page (Page 5 (S10))
		--> Page 5 (S10): Payment Confirmation Page
				○ Once the submit button is clicked, customers receive a pop up that ask them to confirm their information.
		
	- And it continues to the final thank you page (Page 6 (S11))
		--> Page 6 (S11) : Final Thank You Page
				○ After the customer information has been confirmed, it displays the final page with a pop up text "Thank you for dining."
				○ Logo should be displayed with tag line "Making dining fun."
	


