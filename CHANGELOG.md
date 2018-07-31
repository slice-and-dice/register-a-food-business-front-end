## Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## v1.26.0 - 31st July 2018 (unreleased)

### Added

* SDB-47 Registration confirmation number

## v1.25.0 - 31st July 2018 (unreleased)

### Added

* SDB-236 Registration submission date

## v1.24.1 - 31st July 2018 (unreleased)

### Modified

* Updated application-complete page to registration-summary page and reflect design

## v1.24.0 - 27th July 2018 (unreleased)

### Added

* SDB-50 Establishment Address Type

## v1.23.0 - 27th July 2018 (unreleased)

### Modified

* Modified output of data transforms to match new data structure

## v1.22.2 - 27th July 2018 (unreleased)

### Modified

* Design review fixes for edit summary page

## v1.22.1 - 27th July 2018 (unreleased)

### Modified

* Bugfix for edit mode when clicking the browser back button

## v1.22.0 - 25th July 2018 (unreleased)

### Added

* SDB-157 Edit summary page - items not influencing registration flow

## v1.21.2 - 17th July 2018 (unreleased)

### Modified

* Removed day, month, year from submission data, combined establishment_opening_date already exists

## v1.21.1 - 17th July 2018 (unreleased)

### Modified

* Removed day, month, year from submission data, combined establishment_opening_date already exists

## v1.21.0 - 17th July 2018 (unreleased)

### Added

* SDB-114 Adding proactive establishment trading date
* SDB-115 Adding retroactive establishment trading date

## v1.20.0 - 13th July 2018 (unreleased)

### Added

* SDB-252 Adding Error summary boxes to all pages

## v1.19.0 - 13th July 2018 (unreleased)

### Added

* SDB-373 Adding Beta banner to all pages

## v1.18.1 - 12th July 2018 (unreleased)

### Modified

* Modifield validateStreet to be validateOptionalString

## v1.18.0 - 12th July 2018 (unreleased)

### Added

* SDB-241 Contact representative

## v1.17.0 - 11th July 2018 (unreleased)

### Added

* SDB-117 Customer Type

## v1.16.0 - 10th July 2018 (unreleased)

### Added

* Modified session storage to use database

## v1.15.0 - 10th July 2018 (unreleased)

### Added

* SDB-113 Added establishment contact details page with 'reuse operator contact details' button
* Add switches route and controller

## v1.14.4 - 4th July 2018 (unreleased)

### Modified

* Adding typechecking to all pages

## v1.14.3 - 3rd July 2018 (unreleased)

### Modified

* Adding summary text to operator charity details page

## v1.14.2 - 3rd July 2018 (unreleased)

### Modified

* Added config.js file to set application variables from environment variables, which enables isolating units for testing

## v1.14.1 - 2nd July 2018 (unreleased)

### Modified

* Enabled QA route to be flexible - can redirect to any page following injection

## v1.14.0 - 2nd July 2018 (unreleased)

### Added

* SDB-40 Charity details

### Modified

* Bypassed console errors for MultiChoice component

## v1.13.3 - 29th June 2018 (unreleased)

### Modified

* Modified deploy script to include start command.
* Modifed index.js to remove async reference

## v1.13.2 - 29th June 2018 (unreleased)

### Modified

* Updated to govuk-react 0.2.7 and adjusted front-end to account for the changes

## v1.13.1 - 28th June 2018 (unreleased)

### Added

* SDB-244 Added special route for QA test data injection for Registration Summary

## v1.13.0 - 28th June 2018 (unreleased)

### Added

* SDB-1 Operator Address

## v1.12.1 - 28th June 2018 (unreleased)

### Modified

* Make all 'Continue' green buttons re-usable from a new component, with consistent IDs
* Add ID to link for testing

## v1.12.0 - 28th June 2018 (unreleased)

### Added

* SDB-232 Back link routing and addition to all pages

## v1.11.1 - 26th June 2018 (unreleased)

### Modified

* Fix persistence of answers that have been removed since previous submit

## v1.11.0 - 25th June 2018 (unreleased)

### Added

* SDB-36 Added limited company details

## v1.10.0 - 25th June 2018 (unreleased)

### Added

* SDB-54 Registration Role (note: misnamed as operator type in commits)

## v1.9.0 - 25th June 2018 (unreleased)

### Added

* Session cleaning service for obsolete answers

## v1.8.1 - 21st June 2018 (unreleased)

### Modified

* Refactor validation service to use register-a-food-business-validation library

## v1.8.0 - 21st June 2018 (unreleased)

### Added

* SDB-243 Implemented ContentItem vertical spacing method

## v1.7.1 - 21st June 2018 (unreleased)

### Added

* SDB-240 Added autocomplete tags to input fields

## v1.7.0 - 20th June 2018 (unreleased)

### Modified

* Refactored app.server.js into routes.js, index.js, /controllers, server.js. Added tests to get coverage to 100%

## v1.6.0 - 20th June 2018 (unreleased)

### Added

* Added IDs to all buttons for QA

## v1.5.0 - 15th June 2018 (unreleased)

### Added

* SDB-146 - Simple Contact Details

## v1.4.0 - 15th June 2018 (unreleased)

### Added

* SDB-8 - Registration summary

## v1.3.0 - 14th June 2018 (unreleased)

### Added

* SDB-35 - Operator Name

## v1.2.1 - 13th June 2018 (unreleased)

### Modified

* Fixed establishment trading name info typo

## v1.2.0 - 13th June 2018 (unreleased)

### Added

* SDB-4 - Establishment trading name

## v1.1.0 - 6th June 2018 (unreleased)

### Added

* SDB-42 - Route provider
* SDB-44 - Back end connection
* SDB-34 - Submit a registration
* SDB-49 - Establishment address (without info drop down)
* SDB-58 - Landing page
